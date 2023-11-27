const FetchError = require('./FetchError');

const getDefaults = () => ({
  reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000,
  requestOptions: {
    mode: 'cors',
    credentials: 'same-origin',
    cache: 'default',
  },
  localPath: 'public/locales/{{ln}}/{{ns}}.json',
});

class Backend {
  init(services, backendOptions = {}, i18nextOptions = {}) {
    this.baseUrl =
      'https://localization-framework.vercel.app/api/projects/translations/{{ln}}';
    this.services = services;
    this.options = { ...getDefaults(), ...backendOptions };
    this.options.requestOptions.headers = new Headers({
      Authorization: 'Bearer ' + backendOptions.apiKey ?? '',
      'Content-Type': 'application/json',
    });
    this.allOptions = i18nextOptions;
    if (this.services && this.options.reloadInterval) {
      setInterval(() => this.reload(), this.options.reloadInterval);
    }
  }

  read(language, namespace, callback) {
    let fetchUrl = this.baseUrl.replace('{{ln}}', language);

    fetch(fetchUrl, this.options.requestOptions)
      .then(async (x) => {
        if (x.status >= 400) {
          throw new FetchError(x.status, x.statusText);
        }
        let json = await x.json();
        let result = json.translations[namespace] ?? {};
        callback(null, result);
      })
      .catch((e) => {
        callback(e, null);
      });
  }

  reload() {
    const { backendConnector, languageUtils, logger } = this.services;
    const currentLanguage = backendConnector.language;
    if (currentLanguage && currentLanguage.toLowerCase() === 'cimode') return; // avoid loading resources for cimode

    const toLoad = [];
    const append = (lng) => {
      const lngs = languageUtils.toResolveHierarchy(lng);
      lngs.forEach((l) => {
        if (toLoad.indexOf(l) < 0) toLoad.push(l);
      });
    };

    append(currentLanguage);

    if (this.allOptions.preload)
      this.allOptions.preload.forEach((l) => append(l));

    toLoad.forEach((lng) => {
      this.allOptions.ns.forEach((ns) => {
        backendConnector.read(lng, ns, 'read', null, null, (err, data) => {
          if (err)
            logger.warn(
              `loading namespace ${ns} for language ${lng} failed`,
              err
            );
          if (!err && data)
            logger.log(`loaded namespace ${ns} for language ${lng}`, data);

          backendConnector.loaded(`${lng}|${ns}`, err, data);
        });
      });
    });
  }
}

Backend.type = 'backend';

module.exports = Backend;

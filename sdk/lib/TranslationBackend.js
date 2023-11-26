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
    this.baseUrl = 'http://localhost:3001/{{projectId}}/{{ln}}/{{ns}}.json';
    this.services = services;
    this.options = { ...getDefaults(), ...backendOptions };
    this.allOptions = i18nextOptions;
    if (this.services && this.options.reloadInterval) {
      setInterval(() => this.reload(), this.options.reloadInterval);
    }
    this.url = this.baseUrl.replace('{{projectId}}', backendOptions.projectId);
  }

  read(language, namespace, callback) {
    let fetchUrl = this.url
      .replace('{{ln}}', language)
      .replace('{{ns}}', namespace);

    fetch(fetchUrl, this.requestOptions)
      .then(async (x) => {
        if (x.status >= 400) {
          throw new FetchError(x.status, x.statusText);
        }
        let json = await x.json();
        callback(null, json);
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

const ChainedBackend = require('i18next-chained-backend/i18nextChainedBackend');
const LocalStorageBackend = require('i18next-localstorage-backend/i18nextLocalStorageBackend');
const resourcesToBackend = require('i18next-resources-to-backend/cjs');
const TranslationBackend = require('sdk');

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hu'],
  },
  fallbackLng: 'en',
  use: [ChainedBackend],
  partialBundledLanguages: true,
  backend: {
    backends: [
      LocalStorageBackend,
      TranslationBackend,
      resourcesToBackend((lng, ns) =>
        require(`public/locales/${lng}/${ns}.json`)
      ),
    ],
    backendOptions: [
      {},
      {
        projectId: 'asd',
        reloadInterval: 5_000,
      },
    ],
  },
  serializeConfig: false,
};

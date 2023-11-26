# Introduction

This is a simple i18next backend to be used in Node.js, in the browser. It will load resources from the [localization-framework](https://github.com/BaDo2001/localization-framework) backend server using the fetch API.

## Install

You can install this package using `npm install <path>` where path must point to sdk directory.

## Example configuration

~/next-i18next.config.js

```js
const ChainedBackend = require('i18next-chained-backend/i18nextChainedBackend');
const LocalStorageBackend = require('i18next-localstorage-backend/i18nextLocalStorageBackend');
const resourcesToBackend = require('i18next-resources-to-backend/cjs');
const TranslationBackend = require('sdk');

const isBrowser = typeof window !== 'undefined';

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
    reloadInterval: isBrowser ? false : 5_000,
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
        projectId: process.env.I18NEXT_PROJECT_ID,
      },
    ],
  },
  serializeConfig: false,
};
```

~/next.config.js

```js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
};

module.exports = nextConfig;
```

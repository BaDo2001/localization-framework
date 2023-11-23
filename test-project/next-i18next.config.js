const HttpBackend = require("i18next-http-backend/cjs");
const ChainedBackend = require("i18next-chained-backend/i18nextChainedBackend");
const resourcesToBackend = require("i18next-resources-to-backend/cjs");

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "hu"],
  },
  use: [ChainedBackend],
  backend: {
    backends: [
      HttpBackend,
      resourcesToBackend((lng, ns) =>
        require(`public/locales/${lng}/${ns}.json`)
      ),
    ],
    backendOptions: [
      {
        crossDomain: true,
        loadPath: "http://localhost:3001/project-id/{{lng}}/{{ns}}.json",
        requestOptions: {
          mode: "cors",
          credentials: "same-origin",
          cache: "default",
        },
        reloadInterval: 5_000,
        parse: async (data, url) => {
          return JSON.parse(data);
        },
        request: async (options, url, payload, callback) => {
          try {
            const response = await fetch(url, {
              ...options,
              body: payload,
            });
            const responseData = await response.json();
            if (response.status >= 400) {
              throw new Error(responseData.error);
            }
            callback(null, { status: response.status, data: responseData });
          } catch (error) {
            callback(error, {
              status: error.response?.status,
              data: error.response?.data,
            });
          }
        },
        // addPath: "/locales/add/{{lng}}/{{ns}}",
      },
    ],
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  // localePath:
  //   typeof window === "undefined"
  //     ? require("path").resolve("./public/locales")
  //     : "/locales",

  // reloadOnPrerender: process.env.NODE_ENV === "development",

  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  // saveMissing: false,
  // strictMode: true,
  serializeConfig: false,
  // react: { useSuspense: false },
};

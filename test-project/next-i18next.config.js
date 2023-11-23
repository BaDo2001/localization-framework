const HttpBackend = require("i18next-http-backend/cjs");

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "hu"],
  },
  use: [HttpBackend],
  backend: {
    crossDomain: true,
    loadPath: "http://localhost:3001/project-id/{{lng}}/{{ns}}.json",
    requestOptions: {
      mode: "cors",
      credentials: "same-origin",
      cache: "default",
    },
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
        callback(null, { status: response.status, data: responseData });
      } catch (error) {
        console.log(error);
        callback(error, {
          status: error.response?.status,
          data: error.response?.data,
        });
      }
    },
    // addPath: "/locales/add/{{lng}}/{{ns}}",
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
  react: { useSuspense: false },
};

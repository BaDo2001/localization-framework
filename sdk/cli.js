#!/usr/bin/env node

const defaultConfig = require("./config");

const TranslationSDK = require("./index");
const sdk = new TranslationSDK(defaultConfig);

if (process.argv.length < 3) {
  console.log("Usage: sdk <command>");
  process.exit(1);
}

(async () => {
  switch (process.argv[2]) {
    case "get":
      await sdk
        .getTranslations()
        .then(() => {
          console.log("Translations downloaded successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      break;
    default:
      console.log("Unknown command");
      break;
  }
})();

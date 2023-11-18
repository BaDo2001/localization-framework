const fs = require("fs/promises");
const path = require("path");

class TranslationSDK {
  constructor(config) {
    this.endpoint = config.endpoint;
    this.path = path.format(path.parse(config.path));

    this._initMethods();
  }

  _initMethods = () => {
    this.getTranslations = async () => {
      //const res = await fetch(this.endpoint);
      let content = await fs.readFile("./example.json");
      let contentJson = JSON.parse(content);

      for (let lang of Object.entries(contentJson)) {
        fs.mkdir(this.path, { recursive: true });

        await fs.writeFile(
          path.format({
            dir: this.path,
            name: lang[0],
            ext: ".json",
          }),
          JSON.stringify(lang[1])
        );
      }
    };
  };
}

module.exports = TranslationSDK;

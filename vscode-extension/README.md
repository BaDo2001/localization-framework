# Localization Framework VSCode extension

This extension helps you quickly add new localization keys and keeps the keys in sync for the given project.

## Features

### Commands

### First time settings prompts

When you run the any of the commands for the first time you will get some of the prompts asking for settings required for running the commands.

These settings can be changed anytime in the .vscode/settings.json file in the repository. [Extension settings](#extension-settings)

 - Backend server

Set the backend server where the project api is available.

![Set backend base url](/vscode-extension/docs/images/settings-backend.png)

 - Api key

Set the api key which is generated for the given project in the settings (admin site).

![Choose project](/vscode-extension/docs/images/api-key.png)

 - Translations folder

Choose the folder in the current repository where the translations json files will be downloaded and kept in sync.

![Choose translations folder](/vscode-extension/docs/images/settings-folder.png)

### Localization Framework: Add Translation

Type the localization you want to add to the project:

![Adding new localization key](/vscode-extension/docs/images/add-key.png)

Add the project native language translation for the key:

![Adding default translation](/vscode-extension/docs/images/add-native.png)

If the key is not already taken you get a message for a successful addition:

![Successful addition](/vscode-extension/docs/images/add-success.png)

### Localization Framework: Synchronize Project Translations

If all the settings are set, it will download all the latest translation keys and saves them to the given translation folder. On success gives the following message:

![Successful sync](/vscode-extension/docs/images/sync-ok.png)

### Prompts

Both commands operate with text inputs. Anytime the user presses Esc or clicks away the prompt and the command will get canceled and displays the following warning message:

![Cancel warning](/vscode-extension/docs/images/cancel.png)

## Requirements

Localization framework backend server.

## Extension Settings

The extension has the settings describe at [First time prompts](#first-time-settings-prompts) for every repository. You can change these with the following keys:

 * `localizationframework.baseUrl`
 * `localizationframework.projectId`
 * `localizationframework.translationsFolder`

## Known Issues

None currently.

## Release Notes

Initial release


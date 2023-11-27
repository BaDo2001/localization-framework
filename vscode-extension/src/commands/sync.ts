import * as vscode from "vscode";
import { LocalizationFrameworkUtils } from "../utils/utils";
import { LocalizationFrameworkClient } from "../network/client";
import { Translations } from "../models/translations";

export async function handleSyncCommand() {
  const translationsFolder =
    await LocalizationFrameworkUtils.getTranslationsFolder();
  if (!translationsFolder) return;

  const syncedProject = await LocalizationFrameworkClient.syncProject(
    async (error: unknown) => {
      vscode.window.showErrorMessage(`Sync failed! ${error}`);
    }
  );

  if (!syncedProject) return;

  writeTranslationFiles(syncedProject);

  vscode.window.showInformationMessage("Localization files synced.");
}

async function writeTranslationFiles(translations: Translations) {
  let translationFolder =
    await LocalizationFrameworkUtils.getTranslationsFolder();
  if (!translationFolder) return;
  let folderUri = vscode.Uri.joinPath(
    vscode.workspace.workspaceFolders![0].uri,
    translationFolder
  );

  translations.languages.forEach((language) => {
    let fileUri = vscode.Uri.joinPath(
      folderUri,
      `translations_${language.languageCode}.json`
    );
    LocalizationFrameworkUtils.createFileFromJson(
      fileUri,
      JSON.stringify(language.translations, null, 2)
    );
  });
}

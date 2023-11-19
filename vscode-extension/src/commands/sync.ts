import * as vscode from "vscode";
import { LocalizationFrameworkUtils } from "../utils/utils";
import { LocalizationFrameworkClient } from "../network/client";
import { Translations } from "../models/translations";

export async function handleSyncCommand() {
  const projectId = await LocalizationFrameworkUtils.getProjectId();
  if (!projectId) return;

  const translationsFolder =
    await LocalizationFrameworkUtils.getTranslationsFolder();
  if (!translationsFolder) return;

  const syncedProject = await LocalizationFrameworkClient.syncProject(
    projectId,
    async (error: unknown) => {
      await vscode.window.showErrorMessage(`Sync failed! ${error}`);
    }
  );

  if (!syncedProject) return;

  writeTranslationFiles(syncedProject);

  await vscode.window.showInformationMessage("Localization files synced.");
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
    let nested = LocalizationFrameworkUtils.dotToNestedObject(
      language.translations
    );
    LocalizationFrameworkUtils.createFileFromJson(
      fileUri,
      JSON.stringify(nested, null, 2)
    );
  });
}

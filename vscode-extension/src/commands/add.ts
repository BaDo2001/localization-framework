import * as vscode from "vscode";
import {
  LocalizationFrameworkUtils,
  ExtensionConstants as ec,
} from "../utils/utils";
import { LocalizationFrameworkClient } from "../network/client";
import { handleSyncCommand } from "./sync";

export async function handleAddCommand() {
  const projectId = await LocalizationFrameworkUtils.getApiKey();
  if (!projectId) return;

  const key = await vscode.window.showInputBox({
    prompt: "Enter localization key:",
    title: "Add new localization key",
    placeHolder: "group.key",
  });

  if (!key) throw ec.cancel;

  const nativeText = await vscode.window.showInputBox({
    prompt: "Enter localization for the native language:",
    title: "Native language text",
    placeHolder: "Text",
  });

  if (!nativeText) throw ec.cancel;

  const response = await LocalizationFrameworkClient.addNewKey(
    key,
    nativeText,
    async (error) => {
      vscode.window.showErrorMessage(
        `Cannot add key: ${error.response?.data?.error ?? error}`
      );
    }
  );

  if (response && response.status === 200) {
    handleSyncCommand().then(() => {
      vscode.window.showInformationMessage(
        `Localization added for key: ${key}`
      );
    });
  }
}

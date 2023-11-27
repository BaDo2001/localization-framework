import * as https from "https";
import * as vscode from "vscode";
import { ExtensionConstants as ec } from "../utils/utils";
import { LocalizationFrameworkClient } from "../network/client";
import { TextEncoder } from "util";

export const customHttpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const ExtensionConstants = {
  extensionName: "localizationframework",
  commands: {
    sync: "sync",
    add: "add",
  },
  settings: {
    baseUrl: "baseUrl",
    apiKey: "apiKey",
    translationsFolder: "translationsFolder",
  },
  cancel: "canceled",
};

export const LocalizationFrameworkUtils = {
  openSettings: async () => {
    await vscode.commands.executeCommand(
      "workbench.action.openWorkspaceSettings",
      ExtensionConstants.extensionName
    );
  },

  getApiKey: async (): Promise<string | undefined> => {
    const settings = vscode.workspace.getConfiguration(ec.extensionName);
    let apiKey = settings.get<string | null>(ec.settings.apiKey);

    if (apiKey) return apiKey;

    if (!apiKey) {
      apiKey = await vscode.window.showInputBox({
        prompt: "Enter api key:",
        title: "Enter an api key to access you project",
        placeHolder: "26acca05-4694-4671-9e43-78a694905d97",
      });

      if (!apiKey) throw ec.cancel;
    }

    const project = await LocalizationFrameworkClient.getProjectInfo(
      apiKey,
      async (error) => {
        await vscode.window.showErrorMessage(`Error: ${error}`);
      }
    );

    if (!project) {
      return undefined;
    }

    await settings.update(ec.settings.apiKey, apiKey);

    return apiKey;
  },

  getTranslationsFolder: async (): Promise<string | undefined> => {
    const settings = vscode.workspace.getConfiguration(ec.extensionName);
    let translationsFolder = settings.get<string | null>(
      ec.settings.translationsFolder
    );

    if (!translationsFolder) {
      translationsFolder = await vscode.window.showInputBox({
        prompt: "Enter translation folder path:",
        title: "Where to store translation json files?",
        value: "src/translations",
        placeHolder: "src/translations",
      });

      if (!translationsFolder) throw ec.cancel;
    }
    if (!(await checkFolderExists(translationsFolder))) {
      await createFolder(translationsFolder);
      vscode.window.showInformationMessage(
        `Translation folder set: ${translationsFolder}`
      );
    }

    settings.update(ec.settings.translationsFolder, translationsFolder);
    return translationsFolder;
  },

  createFileFromJson: async (
    fileUri: vscode.Uri,
    jsonText: string
  ): Promise<boolean> => {
    let enc = new TextEncoder();
    await vscode.workspace.fs.writeFile(fileUri, enc.encode(jsonText));
    return true;
  },

  hasWorkSpaceOpen: (): boolean => {
    const wsfs = vscode.workspace.workspaceFolders;
    if (!wsfs || wsfs.length === 0) {
      vscode.window.showErrorMessage("No workspace is open!");
      return false;
    }

    return true;
  },
};

async function checkFolderExists(folderPath: string): Promise<boolean> {
  const wsfs = vscode.workspace.workspaceFolders;
  let folderUri = vscode.Uri.joinPath(wsfs![0].uri, folderPath);
  try {
    let stat = await vscode.workspace.fs.stat(folderUri);
    return stat.type === vscode.FileType.Directory;
  } catch (error) {
    return false;
  }
}

async function createFolder(folderPath: string): Promise<boolean> {
  const wsfs = vscode.workspace.workspaceFolders;
  let folderUri = vscode.Uri.joinPath(wsfs![0].uri, folderPath);
  await vscode.workspace.fs.createDirectory(folderUri);
  return true;
}

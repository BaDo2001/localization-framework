import * as https from "https";
import * as vscode from "vscode";
import { ExtensionConstants as ec } from "../utils/utils";
import { LocalizationFrameworkClient } from "../network/client";

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
    projectId: "projectId",
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

  getProjectId: async (): Promise<string | undefined> => {
    const settings = vscode.workspace.getConfiguration(ec.extensionName);
    let projectId = settings.get<string | null>(ec.settings.projectId);

    if (projectId) return projectId;

    const projects = await LocalizationFrameworkClient.getProjects(
      async () => {}
    );

    if (!projects || projects.length === 0) {
      await vscode.window.showErrorMessage("No projects found.");
      return undefined;
    }

    let selection = projects.map((p) => `${p.name} |${p.id}`);

    if (!projectId) {
      let selected = await vscode.window.showQuickPick(selection, {
        canPickMany: false,
        title: "Select a project for synchronization:",
      });

      projectId = selected?.split("|")?.at(1);

      if (!projectId) throw ec.cancel;
    }

    await settings.update(ec.settings.projectId, projectId);

    return projectId;
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

  dotToNestedObject: (dottedObject: any): any => {
    let keys = Object.keys(dottedObject);
    let obj = {};
    keys.forEach((key) => {
      let ks = key.split(".");
      obj = writeWithKey(ks, obj, dottedObject[key]);
    });
    return obj;
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

function writeWithKey(keys: string[], obj: any, value: any): any {
  let key = keys.shift();
  if (!key) return;

  let p = obj[key];
  if (!p) {
    obj[key] = {};
  }

  if (keys.length === 0) {
    obj[key] = value;
  } else {
    writeWithKey(keys, obj[key], value);
  }
  return obj;
}

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

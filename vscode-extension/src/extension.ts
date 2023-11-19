import * as vscode from "vscode";
import { handleSyncCommand } from "./commands/sync";
import { LocalizationFrameworkUtils, ExtensionConstants as ec } from "./utils/utils";
import { handleAddCommand } from "./commands/add";

export function activate(context: vscode.ExtensionContext) {
  let disposables: vscode.Disposable[] = [];
  disposables.push(
    vscode.commands.registerCommand(
      `${ec.extensionName}.${ec.commands.sync}`,
      errorHandler(handleSyncCommand)
    ),
    vscode.commands.registerCommand(
      `${ec.extensionName}.${ec.commands.add}`,
      errorHandler(handleAddCommand)
    )
  );

  context.subscriptions.push(...disposables);
}

export function deactivate() {}

function errorHandler(commandHandler: () => Promise<void>) {
  return () => {
    if(!LocalizationFrameworkUtils.hasWorkSpaceOpen()) return;
    commandHandler().catch((reason) => {
      if(reason === "canceled") {
        vscode.window.showWarningMessage("Operation canceled");
      } else {
        vscode.window.showErrorMessage(`Error: ${reason}`);
      }
    });
  };
}

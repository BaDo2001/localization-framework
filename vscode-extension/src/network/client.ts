import { LocalizationFrameworkUtils, customHttpsAgent } from "../utils/utils";
import axios from "axios";
import * as vscode from "vscode";
import { ExtensionConstants as ec } from "../utils/utils";
import { Project } from "../models/project";
import { Translations } from "../models/translations";

type errorCallback = (error: any) => Promise<any>;

export const LocalizationFrameworkClient = {
  syncProject: async (
    errorCallback: errorCallback
  ): Promise<Translations | undefined> => {
    const baseUrl = await getBaseUrl();
    const apiKey = await LocalizationFrameworkUtils.getApiKey();
    try {
      const response = await axios.get<Translations>(
        `${baseUrl}/api/projects/translations`,
        {
          httpsAgent: customHttpsAgent,
          headers: { Authorization: `Bearer ${apiKey}` },
        }
      );
      return response.data;
    } catch (error) {
      errorCallback(error);
    }
  },

  getProjectInfo: async (
    apiKey: string,
    errorCallback: errorCallback
  ): Promise<Project[] | undefined> => {
    const baseUrl = await getBaseUrl();
    try {
      const response = await axios.get<Project[]>(`${baseUrl}/api/projects`, {
        httpsAgent: customHttpsAgent,
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      return response.data;
    } catch (error) {
      errorCallback(error);
    }
  },

  addNewKey: async (
    key: string,
    nativeText: string,
    errorCallback: errorCallback
  ): Promise<any> => {
    const baseUrl = await getBaseUrl();
    const apiKey = await LocalizationFrameworkUtils.getApiKey();
    try {
      const response = await axios.post(
        `${baseUrl}/api/projects/keys`,
        {
          key: key,
          nativeText: nativeText,
        },
        {
          httpsAgent: customHttpsAgent,
          headers: { Authorization: `Bearer ${apiKey}` },
        }
      );
      return response;
    } catch (error) {
      errorCallback(error);
    }
  },
};

async function getBaseUrl(): Promise<string | undefined> {
  const settings = vscode.workspace.getConfiguration(ec.extensionName);
  let baseUrl = settings.get<string | null>(ec.settings.baseUrl);
  if (!baseUrl) {
    baseUrl = await vscode.window.showInputBox({
      placeHolder: "http(s)://domain-or-ip:port",
      title: "Set base url of backend server",
      prompt: "Please enter the base url of your backend server!",
    });

    if (!baseUrl) throw ec.cancel;
  }

  await settings.update(ec.settings.baseUrl, baseUrl);

  return baseUrl;
}

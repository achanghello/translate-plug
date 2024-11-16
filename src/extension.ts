import * as vscode from "vscode";
import { BaiduApi } from "./api";
import { FileOpt } from "./file-opt";

export function activate(context: vscode.ExtensionContext) {
  /**
   * 模板普通文本
   */
  const templateText = vscode.commands.registerCommand(
    "langue-taranslate.templateText",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        if (selectedText) {
          const translated = await BaiduApi.translateText(selectedText);
          vscode.window.showInformationMessage(`翻译结果: ${translated}`);
          editor.edit((editBuilder) => {
            editBuilder.replace(
              editor.selection,
              `{{ $t("${selectedText}") }}`
            );
            FileOpt.fileInTranslation(selectedText, translated);
          });
        } else {
          vscode.window.showWarningMessage("没有选中文本");
        }
      }
    }
  );

  /**
   * 模板配置文本
   */
  const templateQuoteText = vscode.commands.registerCommand(
    "langue-taranslate.templateQuoteText",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        if (selectedText) {
          const translated = await BaiduApi.translateText(selectedText);
          vscode.window.showInformationMessage(`翻译结果: ${translated}`);
          editor.edit((editBuilder) => {
            editBuilder.replace(editor.selection, `$t('${selectedText}')`);
            FileOpt.fileInTranslation(selectedText, translated);
          });
        } else {
          vscode.window.showWarningMessage("没有选中文本");
        }
      }
    }
  );

  /**
   * 脚本文本
   */
  const scriptText = vscode.commands.registerCommand(
    "langue-taranslate.scriptText",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        if (selectedText) {
          const translated = await BaiduApi.translateText(selectedText);
          vscode.window.showInformationMessage(`翻译结果: ${translated}`);
          editor.edit((editBuilder) => {
            editBuilder.replace(
              editor.selection,
              `i18n.global.t(${selectedText})`
            );
            FileOpt.fileInTranslation(selectedText, translated);
          });
        } else {
          vscode.window.showWarningMessage("没有选中文本");
        }
      }
    }
  );

  /**
   * 不改变文本
   */
  const noChangeText = vscode.commands.registerCommand(
    "langue-taranslate.noChangeText",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        if (selectedText) {
          const translated = await BaiduApi.translateText(selectedText);
          vscode.window.showInformationMessage(`翻译结果: ${translated}`);
          editor.edit((editBuilder) => {
            FileOpt.fileInTranslation(selectedText, translated);
          });
        } else {
          vscode.window.showWarningMessage("没有选中文本");
        }
      }
    }
  );

  context.subscriptions.push(
    templateText,
    templateQuoteText,
    scriptText,
    noChangeText
  );
}

export function deactivate() {}

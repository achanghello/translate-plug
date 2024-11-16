// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as crypto from "crypto";
import path from "path";
import axios from "axios";
import * as fs from "fs";

// 百度翻译API所需的参数
let appid = "20241115002202999"; // 你的appid
let apiKey = "s05ejgQOygc5ypqTufQw"; // 你的API密钥
// 指定保存翻译数据的 JSON 文件路径
const translationFilePath = path.join(
  vscode.workspace.rootPath || "",
  "src/locales/modules/zh_cn.json"
);
// 指定保存翻译数据的 JSON 文件路径
const translationFilePath2 = path.join(
  vscode.workspace.rootPath || "",
  "src/locales/modules/en.json"
);

// 获取插件的配置项
const config = vscode.workspace.getConfiguration("translatePlugin");

// 读取配置项（App ID 和 API Key）
if (config.get<string>("baiduAppId")) {
  appid = config.get<string>("baiduAppId") ?? "";
}
if (config.get<string>("baiduApiKey")) {
  apiKey = config.get<string>("baiduApiKey") ?? "";
}

// 生成签名函数
function generateSign(q: string, salt: string) {
  const str = appid + q + salt + apiKey; // 拼接字符串
  const sign = crypto.createHash("md5").update(str).digest("hex"); // 生成MD5签名
  return sign;
}

const translateText = async (q: string, targetLang: string = "en") => {
  const salt = (Math.random() * 1000000000).toString().split(".")[0]; // 随机数
  const sign = generateSign(q, salt);

  // 构建请求URL
  const url = "https://fanyi-api.baidu.com/api/trans/vip/translate";
  const params = new URLSearchParams({
    q, // 待翻译文本
    from: "zh", // 源语言4654564
    to: "en", // 目标语言
    appid, // AppID
    salt, // 随机数
    sign, // 签名
  });

  try {
    const response = await axios.post(url, params);
    const result = response.data;

    if (result.error_code) {
      console.error("翻译失败，错误代码：", result.error_code);
      return "";
    }

    // 输出翻译结果
    console.log("翻译结果:", result.trans_result[0].dst);
    // return translationFilePath;
    return result.trans_result[0].dst ?? "";
  } catch (error) {
    console.error("请求失败:", error);
    return "";
  }
};

function logTranslation(originalText: string, translatedText: string) {
  // 如果 JSON 文件不存在，则创建一个空的翻译记录数组
  if (!fs.existsSync(translationFilePath2)) {
    fs.writeFileSync(translationFilePath2, JSON.stringify([]));
  }

  // 读取现有的翻译记录
  const existingTranslations2 = JSON.parse(
    fs.readFileSync(translationFilePath2, "utf-8")
  );

  if (!existingTranslations2[originalText]) {
    existingTranslations2[originalText] = translatedText;
  }
  // 保存更新后的翻译记录
  fs.writeFileSync(
    translationFilePath2,
    JSON.stringify(existingTranslations2, null, 2)
  );

  // 读取现有的翻译记录
  const existingTranslations = JSON.parse(
    fs.readFileSync(translationFilePath, "utf-8")
  );

  if (!existingTranslations[originalText]) {
    existingTranslations[originalText] = originalText;
  }
  // 保存更新后的翻译记录
  fs.writeFileSync(
    translationFilePath,
    JSON.stringify(existingTranslations, null, 2)
  );

  vscode.window.showInformationMessage(
    `Translation saved to ${translationFilePath}`
  );
}

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
//   // Use the console to output diagnostic information (console.log) and errors (console.error)
//   // This line of code will only be executed once when your extension is activated
//   console.log(
//     'Congratulations, your extension "langue-taranslate" is now active!'
//   );

//   // The command has been defined in the package.json file
//   // Now provide the implementation of the command with registerCommand
//   // The commandId parameter must match the command field in package.json
//   const disposable = vscode.commands.registerCommand(
//     "langue-taranslate.helloWorld",
//     () => {
//       // The code you place here will be executed every time your command is executed
//       // Display a message box to the user
//       vscode.window.showInformationMessage(
//         "Hello World from langue-taranslate!"
//       );
//     }
//   );

//   context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.translateText",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selectedText = editor.document.getText(editor.selection);
        if (selectedText) {
          const translated = await translateText(selectedText);
          vscode.window.showInformationMessage(`Translated: ${translated}`);
          editor.edit((editBuilder) => {
            // editBuilder.replace(editor.selection, translated);
            logTranslation(selectedText, translated);
          });
        } else {
          vscode.window.showWarningMessage("No text selected.");
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

import * as vscode from "vscode";
import path from "path";
import * as fs from "fs";
// 获取插件的配置项
const config = vscode.workspace.getConfiguration("langue-taranslate");
const filePathZh = config.get<string>("filePathZh") ?? "";
const filePathEn = config.get<string>("filePathEn") ?? "";
export class FileOpt {
  // 指定保存翻译数据的 JSON 文件路径
  static translationFilePathZh = path.join(
    vscode.workspace.rootPath || "",
    filePathZh
  );
  // 指定保存翻译数据的 JSON 文件路径
  static translationFilePathEn = path.join(
    vscode.workspace.rootPath || "",
    filePathEn
  );

  static fileInTranslation = async (
    originalText: string,
    translatedText: string
  ) => {
    this.fileInEn(originalText, translatedText);
    this.fileInZh(originalText, translatedText);
  };

  static fileInZh = async (originalText: string, translatedText: string) => {
    // 如果 JSON 文件不存在，则创建一个空的翻译记录数组
    if (!fs.existsSync(this.translationFilePathZh)) {
      fs.writeFileSync(this.translationFilePathZh, JSON.stringify({}));
    }
    // 读取现有的翻译记录
    const existingTranslations = JSON.parse(
      fs.readFileSync(this.translationFilePathZh, "utf-8")
    );
    // 将翻译添加到翻译记录里
    if (!existingTranslations[originalText]) {
      existingTranslations[originalText] = originalText;
    }
    // 保存更新后的翻译记录
    fs.writeFileSync(
      this.translationFilePathZh,
      JSON.stringify(existingTranslations, null, "\t")
    );
  };

  static fileInEn = async (originalText: string, translatedText: string) => {
    // 如果 JSON 文件不存在，则创建一个空的翻译记录数组
    if (!fs.existsSync(this.translationFilePathEn)) {
      fs.writeFileSync(this.translationFilePathEn, JSON.stringify({}));
    }
    // 读取现有的翻译记录
    const existingTranslations = JSON.parse(
      fs.readFileSync(this.translationFilePathEn, "utf-8")
    );
    // 将翻译添加到翻译记录里
    if (!existingTranslations[originalText]) {
      existingTranslations[originalText] = translatedText;
    }
    // 保存更新后的翻译记录
    fs.writeFileSync(
      this.translationFilePathEn,
      JSON.stringify(existingTranslations, null, "\t")
    );
  };
}

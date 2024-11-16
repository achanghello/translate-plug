import * as vscode from "vscode";
import * as crypto from "crypto";
import axios from "axios";
// 获取插件的配置项
const config = vscode.workspace.getConfiguration("langue-taranslate");
export class BaiduApi {
  static url = "https://fanyi-api.baidu.com/api/trans/vip/translate";
  static appid = config.get<string>("baiduAppId") ?? "";
  static apiKey = config.get<string>("baiduApiKey") ?? "";

  static translateText = async (
    beforeText: string,
    targetLang: string = "en"
  ) => {
    // 随机数
    const salt = (Math.random() * 1000000000).toString().split(".")[0];
    // 签名
    const sign = this.generateSign(beforeText, salt);
    // 构建请求参数
    const params = new URLSearchParams({
      q: beforeText, // 待翻译文本
      from: "zh", // 源语言
      to: targetLang, // 目标语言
      appid: this.appid, // AppID
      salt, // 随机数
      sign, // 签名
    });
    try {
      const response = await axios.post(this.url, params);
      const result = response.data;

      if (result.error_code) {
        console.error("翻译失败，错误代码：", result.error_code);
        return "";
      }

      // 输出翻译结果
      return result.trans_result[0].dst ?? "";
    } catch (error) {
      console.error("请求失败:", error);
      return "";
    }
  };

  // 生成签名函数
  static generateSign = (beforeText: string, salt: string) => {
    const str = this.appid + beforeText + salt + this.apiKey; // 拼接字符串
    const sign = crypto.createHash("md5").update(str).digest("hex"); // 生成MD5签名
    return sign;
  };
}

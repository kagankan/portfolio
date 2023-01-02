/// <reference types="@astrojs/image/client" />

export {};

declare global {
  interface Boolean {
    // 存在するのにlib.d.tsで宣言されていないので拡張する
    // 該当Issue: https://github.com/microsoft/TypeScript/issues/38347
    // MDNドキュメント: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Boolean/toString
    toString(): "true" | "false";
  }
}

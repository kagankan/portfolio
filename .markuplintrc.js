// @ts-check

module.exports =
  /** @type {import('@markuplint/ml-config').Config} */
  ({
    extends: ["markuplint:recommended"],
    // parser: {
    //   ".astro$": "@markuplint/astro-parser",
    // },
    rules: {
      "end-tag": true,
      // 対応が難しいため
      "require-accessible-name": false,
    },
    nodeRules: [
      {
        selector: ":where(video, audio)",
        rules: {
          "required-element": false, // "required-element": ["track"] を オフ
        },
      },
    ],
  });

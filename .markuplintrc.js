module.exports = {
  extends: ["markuplint:recommended"],
  // parser: {
  //   ".astro$": "@markuplint/astro-parser",
  // },
  rules: {
    "end-tag": true,
    "invalid-attr": {
      option: {
        attrs: {
          // tailwind の : (コロン) を許可するため
          class: {
            type: "Any",
          },
        },
      },
    },
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
};
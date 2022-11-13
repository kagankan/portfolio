module.exports = {
  extends: [
    "stylelint-config-recess-order",
    "stylelint-config-recommended-scss",
    "stylelint-config-html", // astroファイルやsvelteファイル内のstyle記述を対象にする
    "stylelint-config-prettier",
  ],
  ignoreFiles: ["**/*.js", "**/*.ts"],
  rules: {
    "declaration-property-unit-disallowed-list": [
      {
        "font-size": ["px"], // remを使用するため
        "line-height": ["px"], // 単位なしの倍数を使用するため
      },
    ],
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["modal"] }],
    "scss/selector-no-union-class-name": true,
  },
};

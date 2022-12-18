// @ts-check

// 前提として、管理が煩雑になるため、設定ファイルの記述を増やさないことを目標とする
module.exports =
  /** @type {import('eslint').Linter.Config} */
  ({
    root: true,
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    ignorePatterns: ["!**/*.js"], // .eslintrc.jsなど、通常除外されるファイルを含めるため
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:astro/recommended", "prettier"],
    plugins: ["import"],
    rules: {
      "no-console": "warn", // デバッグ用のログを消し忘れないようにするため
      "import/order": [
        // 作業者間でimport順序を統一するため。その判断に脳のリソースを割かないようにするため。
        // また、node_module, parent, といったグループでまとめることにより、import関係のスコープを意識できる。
        "warn",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "never",
          pathGroups: [{ pattern: "@/**", group: "parent", position: "before" }],
        },
      ],
    },
  });

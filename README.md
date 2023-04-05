# portfolio

https://kagankan.github.io/portfolio/

## サイト・リポジトリの目的

- ポートフォリオサイトを公開して、自己紹介をする。
- 静的サイト制作の個人的ベストプラクティスをまとめる。
  - 結果だけでなく、実装判断の理由を記載するようにする。
- 実験の場として、自分の試したい実装方法や新しい機能を試す。

## 使用技術

- [Astro](https://astro.build/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/) (SCSS)
- [GSAP](https://greensock.com/gsap/)

## ディレクトリ構成

```sh
/
├── public/
├── src/
│   ├── assets/
│   ├── base/       # Astroのデフォルトテンプレートでいうlayoutsの役割。layoutsではなくbaseとするのは、スタイルの適用順がcomponentsよりも先にする意図を表すように、アルファベット順で先に並ぶようにするため。
│   ├── components/ # 汎用的なコンポーネント
│   ├── features/   # 特定の機能・役割に紐づくコンポーネント
│   └── pages/
└── package.json
```

### `components` 内のディレクトリ構成

[Astroコンポーネント](https://docs.astro.build/ja/core-concepts/astro-components/)は、`.astro`ファイル内にスタイルと（クライアントサイドの）スクリプトを書くこともでき、ファイルの数・ディレクトリの深さがシンプルに済むメリットはありますが、いくつかの理由から以下のようにファイルを分割して記述します。

```sh
├── components/
│   ├── [ComponentName]/
│   │   ├── [ComponentName].astro
│   │   ├── [ComponentName].scss
│   │   └── [ComponentName].ts
```

#### ファイルを分割するメリット

- ファイル（拡張子）を見ただけで**どんな技術が使われているかわかりやすい**。
  - .astroファイルの存在を見ただけでは、そもそもスタイル・スクリプトも含まれているのか？　スタイルは素のCSSなのか、SassなのかLessなのか？　スクリプトはJSなのかTSなのか？といったことがわかりにくいです。これらがわかりやすくなっていると、他の人がプロジェクトに参加した場合にも把握しやすくなります。
  - GitHubでは、レポジトリ内で使用されているファイルタイプの割合が表示されるので、その点でもわかりやすくなります。
- **エディタの言語機能の恩恵を受けやすくなる。**
  - .astroファイル内のstyle, script要素内でもほとんどの言語機能を使うことはできますが、あくまで.astroファイル内で無理やり使えるようにしているにすぎないので、いくつかサポートされていない機能があります（具体的には、TSファイル内で変数名の変更（VSCodeのF2キーで実行できる機能）が.astroファイルのscriptではできませんでした）。
- **壊しやすい。**
  - 新しい技術を取り入れる際に気をつけるべきことは、その技術が廃れたときに他の技術に移行することがどれだけしやすいか？です（実際、Astroはつい昨年（2022年）1.0が出たばかりの新しい技術なので、今の時点ではいつまで現役でいるかわかりません）。Astroの機能への依存を減らしておくことで、いざAstroを使わないことを決定した際にはSassはSassで、TSはTSでバンドルすれば使えるような状態にしておきます。

## 開発環境

Visual Studio Code (VSCode) を使用する。

拡張機能が充実していることや、`.vscode` ディレクトリに設定を記載することで、メンバー間の環境の共通化も図りやすいことが理由。

## VSCode拡張

### `.vscode/extensions.json`

`.vscode/extensions.json` に推奨拡張機能を記載する。
わざわざ入力せずとも、拡張機能の歯車マークから「推奨拡張機能に追加」ができる。
なお、このファイル内にコメントを記載することもできるが、新しい拡張機能を追加した際に消えてしまうため、コメントは入れないほうが安心。

### Code Spell Checker (streetsidesoftware.code-spell-checker)

英単語のスペルチェッカー。
変数名などにスペルの間違った単語を使っていると警告される。
恥をかかないために必須の機能。
固有名詞など、スペルチェックから除外したいワードは、右クリック→「Add "〇〇" to workspace settings」で除外できる。

### Astro

Astroのシンタックスハイライトや、フォーマット。

## browserslist

`.browserslistrc` に定義しています。
実際にどのブラウザが対象になっているかは、 `npx browserslist` で確認できます。

## TypeScript

`type` vs `interface` の議論については、 `type` のみを使用する。
interfaceには予期しない上書きの可能性があるなどの危険があるため。
（アプリケーション開発においてはinterfaceが有効な場合もあるかもしれないが、Webサイト開発レベルだとあまり優位性を感じない）

## アニメーションの無効化

[prefers-reduced-motion](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-reduced-motion)で切り替えは可能だが、OSの設定であるため、必ずしもユーザーがWebサイトに適用されるものと思って設定しているとも限らない。
また、場合によって切り替えたいこともあると思う。
そのため、「アニメーションの有効無効の切り替え」機能を提供する。

メディアクエリもしくはサイト上での選択によって無効化する際は `--reduced-motion: reduce;` というカスタムプロパティを設定する。JSではこれを読み取ることによって動作を切り替える。
この命名は、[prefers-color-scheme](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme)メディア特性 と [color-scheme](https://developer.mozilla.org/ja/docs/Web/CSS/color-scheme)プロパティの対応を模したもの。

## コメントの基準

以下のような場合にはコードに対してコメントを記載する。

- 直感的に理解しにくいもの
- 疑問を持たれそうなもの
- 理由が必要なもの

コードだけで表現できている内容にはコメントを記載ない。
（ただし、このリポジトリでは、自分の考えを公開するために、あえて必要以上にコメントを記載している部分があります。）

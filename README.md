# portfolio

## サイト・リポジトリの目的

- ポートフォリオサイトで自己紹介をする。
- 個人的実装ベストプラクティスをまとめる
  - 結果だけでなく、実装判断の理由を記載する。
  - ※普段のプロジェクトでは、コメントの管理コストのほうが高くなってしまうので、必要以上のコメントは入れないようにしています。
- 自分の試したい実装を試す（実験の場）

## 使用技術

- [Astro](https://astro.build/)
- TypeScript
- Sass (SCSS)
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

## 開発環境

Visual Studio Code (VSCode) を使用する。

拡張機能が充実していることや、`.vscode` ディレクトリに設定を記載することで、メンバー間の環境の共通化も図りやすいことが理由。

## VSCode拡張

### `.vscode\extensions.json`

`.vscode\extensions.json` に推奨拡張機能を記載する。
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

`type` vs `interface` については、 `type` のみを使用する。
interfaceには予期しない上書きの可能性があるなどの危険があるため。
（アプリケーション開発においてはinterfaceが有効な場合もあるかもしれないが、Webサイト開発レベルだとあまり優位性を感じない）

## アニメーションの無効化

[prefers-reduced-motion](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-reduced-motion)で切り替えは可能だが、OSの設定であるため、必ずしもユーザーがWebサイトに適用されるものと思って設定しているとも限らない。
また、場合によって切り替えたいこともあると思う。
そのため、「アニメーションの有効無効の切り替え」機能を提供する。

メディアクエリもしくはサイト上での選択によって無効化する際は `--reduced-motion: reduce;` というカスタムプロパティを設定する。JSではこれを読み取ることによって動作を切り替える。
この命名は、[prefers-color-scheme](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme)メディア特性 と [color-scheme](https://developer.mozilla.org/ja/docs/Web/CSS/color-scheme)プロパティの対応を模したものです。

## コメントの基準

- 直感的に理解しにくいもの
- 疑問を持たれそうなもの
- 理由が必要なもの

```
// TODO: 今後やるべきことを書く
// NOTE: 補足情報を書く
```

## フォント検討

Google FontsにFuturaがないので代替を検討
https://fonts.google.com/specimen/Hind

### 候補

https://fonts.google.com/specimen/Urbanist

## 変更箇所

見出しテキストは変更

見出しとテキストの色を変更
（一貫したルールを持たせるため）

セクション内で背景色の明暗が変わるとコントラスト担保が難しいため調整したい

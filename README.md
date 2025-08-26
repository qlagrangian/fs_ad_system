# 契約書動的生成システム (Contract Generation System) 

## 概要

本プロジェクトは、複雑な階層構造を持つ契約書を、Web UI上で動的に生成するためのフロントエンド・プロトタイプです。

手作業による契約書作成は、条項の選択ミス、変数（依頼者名、日付など）の記入漏れ、条番号のズレといったコンプライアンス上のリスクを常に内包しています。このシステムは、**契約書の構造とロジックをデータ（JSON）として一元管理**し、ユーザーがUI上でパラメータを選択・入力するだけで、**論理的に破綻のない正確な契約書**を生成することを目指します。

## 主な機能

- **動的なUI生成**: 契約書テンプレートのJSONスキーマを読み込み、グローバル変数の入力フォームや、条項選択のチェックボックスを自動的にレンダリングします。
    
- **階層構造の可視化**: 契約書の「条・項・号」といった入れ子構造を、インデントを用いて直感的に分かりやすく画面に表示します。
    
- **リアルタイムプレビュー**: UI上で入力した内容や選択した条項が、即座にプレビューエリアに反映されます。
    
- **堅牢なスキーマ駆動開発**: システムの振る舞いは全て `lib/mock-contract.ts` に定義されたスキーマに基づいています。機能追加や変更は、まずこのスキーマを更新することから始めます。
    

## 環境構築と起動方法

このプロジェクトをローカル環境で起動するための手順は以下の通りです。

### 1. 前提条件

- [Node.js](https://nodejs.org/ja "null") (v18.17.0 以上を推奨)
    
- [npm](https://www.npmjs.com/ "null") または [yarn](https://yarnpkg.com/ "null") などのパッケージマネージャ
    

### 2. リポジトリのクローン

まず、このリポジトリを任意のディレクトリにクローンします。

```
git clone https://github.com/[your-repository-url].git
cd contract-generator
```

### 3. 依存パッケージのインストール

プロジェクトに必要なライブラリをインストールします。

```
npm install
# または
# yarn install
```

### 4. shadcn/ui のセットアップ

このプロジェクトはUIコンポーネントに `shadcn/ui` を利用しています。以下のコマンドを実行して、プロジェクトに必要なコンポーネントをセットアップしてください。

まず、`shadcn/ui` の初期設定を行います。（対話形式で設定を聞かれますが、基本的にデフォルトのままで問題ありません）
ただし、ここのコマンドで`shadcn-ui`はダメかもしれないので、エラー時は`shadcn@latest`を試してください。

```
npx shadcn-ui@latest init
```

次に、プロトタイプで使用しているUIコンポーネントをインストールします。

```
npx shadcn-ui@latest add card button input label checkbox separator
```

### 5. 開発サーバーの起動

全ての準備が整ったら、開発サーバーを起動します。

```
npm run dev
```

起動後、ターミナルに表示されるURL (通常は `http://localhost:3000`) にブラウザでアクセスしてください。契約書生成システムのUIが表示されるはずです。

## 🛠️ プロジェクト構造

主要なファイルとディレクトリの役割は以下の通りです。

```
.
├── /app
│   └── page.tsx            # アプリケーションのエントリーポイント（メインページ）
├── /components
│   ├── /ui                 # shadcn/ui によって自動生成されるUIコンポーネント
│   ├── ClauseNode.tsx      # 【コア】条項を再帰的に描画するコンポーネント
│   └── ContractSheet.tsx   # 【コア】UI全体のレイアウトと状態を管理するコンポーネント
├── /lib
│   └── mock-contract.ts    # 【最重要】契約書の構造を定義するスキーマとモックデータ
├── package.json            # プロジェクトの依存関係とスクリプト定義
└── tsconfig.json           # TypeScriptのコンフィグレーション
```

## 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/ "null") (App Router)
    
- **言語**: [TypeScript](https://www.typescriptlang.org/ "null")
    
- **UIライブラリ**: [React](https://react.dev/ "null")
    
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/ "null")
    
- **UIコンポーネント**: [shadcn/ui](https://ui.shadcn.com/ "null")
    


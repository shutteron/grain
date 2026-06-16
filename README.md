# GRAIN — 写真の知識を、感覚に変える。

**写真初心者が、現場で困らない撮影判断力を身につけるための Web 教本アプリ**

---

## 概要

GRAIN は、単なる写真用語辞典ではなく、**撮影現場で「何を優先して考えればいいか」という判断基準まで教える**教材アプリです。

「露出が暗い時はどうする？」「白い服が暗く写るのはなぜ？」「光の方向でどう変わる？」という日々の撮影課題に対して、初心者が自力で判断できるようになることを目指しています。

---

## コンセプト

写真上達の道のりは「設定の使い方を知る」から始まりますが、本当に大事なのは「その設定を『いつ』『どの場面で』『どう判断して』使うか」という選択眼です。

GRAIN は**撮影の意思決定プロセス**を教えることに特化しています。

各教材は以下の構成で書かれています：
1. **一言でいうと** — 核心を一文で
2. **まず何を覚える？** — 初心者向けの直感的な解説
3. **現場ではどう使う？** — 実践的な判断ポイント
4. **よくある失敗** — ありがちなミスと対処法
5. **じゅんいちさんの現場メモ** — 撮影経験から得た感覚
6. **練習課題** — 実際に手を動かす実践課題

---

## 技術構成

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 |
| データ管理 | ローカル TypeScript 配列（`data/lessons.ts`） |
| お気に入り機能 | React Context + localStorage |
| デプロイ | Vercel（自動デプロイ） |
| 検索機能 | クライアント側全文検索 |

---

## 現在の教材数

**28 本の教材**（2024年6月完成）

### 内訳

- **Phase 1（基本教材）**: 20 本
  - 用語：7本、失敗解決：5本、撮りたい写真：3本、光：3本、現場編：2本

- **Phase 2（補完教材）**: 8 本
  - 用語：4本、失敗解決：2本、光：1本、設定：1本

### カテゴリ別教材数

| カテゴリ | 教材数 | 例 |
|---------|--------|-----|
| 用語 (term) | 11本 | 露出・F値・ISO・ホワイトバランス・構図・レンズ焦点距離・カメラの構え方 |
| 失敗解決 (trouble) | 7本 | 暗い写真・ピント外れ・ブレ・背景ボケ・逆光・白い服・黒い服 |
| 撮りたい写真 (genre) | 5本 | ポートレート・プロフィール写真 |
| 光を学ぶ (lighting) | 4本 | 光の基本・光の方向・ストロボ・クリップオンストロボ |
| 設定早見表 (setting) | 1本 | シーン別の推奨カメラ設定 |

### レベル別教材数

| レベル | 教材数 |
|--------|--------|
| 入門 (intro) | 13本 |
| 初級 (basic) | 8本 |
| 中級 (intermediate) | 5本 |
| 現場編 (field) | 2本 |

---

## 主な機能

### 📚 5つの学習導線

1. **用語から探す** — 「F値」「露出」などの基礎用語を体系的に学ぶ
2. **失敗から探す** — 「写真が暗い」「ブレた」などの困った場面から解決方法を学ぶ
3. **撮りたい写真から探す** — ポートレート・プロフィール写真など、目的から学ぶ
4. **光を学ぶ** — 写真の命である「光」について専門的に学ぶ
5. **レベル順に学ぶ** — 入門→初級→中級→現場編の段階的な学習フロー

### ⭐ お気に入り機能

- 教材をブックマークして、いつでもアクセス可能
- localStorage で自動保存（ブラウザを閉じても失われない）
- お気に入り一覧ページで、保存した教材を一覧表示

### 🔍 検索機能

- タイトル、タグ、サマリー、本文から全文検索
- リアルタイム検索で学びたい内容をすぐ見つける

### 📖 関連教材の導線

- 各教材に「次に読む教材」の導線が自動生成
- 学習の流れを自然に進められる

### 📱 レスポンシブデザイン

- スマートフォン、タブレット、PC で最適な表示
- どのデバイスからでも快適に学習可能

---

## ディレクトリ構成

```
grain/
├── app/
│   ├── page.tsx                      # ホーム画面
│   ├── layout.tsx                    # グローバルレイアウト
│   ├── not-found.tsx                 # 404 ページ
│   ├── globals.css                   # グローバルスタイル
│   ├── terms/page.tsx                # 用語一覧ページ
│   ├── troubles/page.tsx             # 失敗解決一覧ページ
│   ├── genres/page.tsx               # 撮りたい写真一覧ページ
│   ├── lighting/page.tsx             # 光を学ぶ一覧ページ
│   ├── levels/page.tsx               # レベル順に学ぶページ
│   ├── settings/page.tsx             # 設定早見表ページ
│   ├── favorites/page.tsx            # お気に入り一覧ページ
│   ├── search/page.tsx               # 検索結果ページ
│   └── lessons/[id]/page.tsx         # 教材詳細ページ（動的ルート）
├── components/
│   ├── NavBar.tsx                    # ボトムナビゲーション
│   ├── SearchBar.tsx                 # 検索バーコンポーネント
│   ├── LessonCard.tsx                # 教材カード表示
│   ├── CategoryCard.tsx              # ホームのカテゴリカード
│   ├── FavoriteButton.tsx            # ☆/★ トグルボタン
│   ├── FavoriteButtonFull.tsx        # お気に入りボタン（詳細ページ用）
│   ├── Tag.tsx                       # タグ表示コンポーネント
│   └── SectionTitle.tsx              # ページタイトルコンポーネント
├── contexts/
│   └── FavoritesContext.tsx          # お気に入り状態管理（React Context）
├── data/
│   └── lessons.ts                    # 教材データ（28本）
├── lib/
│   └── lessons.ts                    # データアクセス関数（フィルタ・検索・導線）
├── types/
│   └── lesson.ts                     # Lesson 型定義
├── public/
│   └── favicon.ico                   # ファビコン
├── README.md                         # このファイル
├── package.json                      # 依存パッケージ管理
├── next.config.ts                    # Next.js 設定
├── tailwind.config.js                # Tailwind CSS 設定
├── tsconfig.json                     # TypeScript 設定
└── eslint.config.mjs                 # ESLint 設定
```

---

## 教材データの追加方法

`data/lessons.ts` の配列に新しい教材を追加します。

### 教材オブジェクトの構造

```typescript
{
  id: 'my-lesson-id',                    // ユニークな ID（英数字・ハイフンのみ）
  title: '教材タイトル',
  level: 'intro',                        // intro / basic / intermediate / field
  category: 'term',                      // term / trouble / genre / lighting / setting
  tags: ['タグ1', 'タグ2', 'タグ3'],
  summary:
    '一言でいうと（教材カードに表示される要約）',
  beginnerExplanation:
    '初心者向けの直感的な解説（複数段落は \\n\\n で区切る）',
  fieldUse:
    '現場ではどう使う？（実践的なポイント）',
  commonMistakes: [
    'よくある失敗1',
    'よくある失敗2',
    'よくある失敗3',
  ],
  junichiNote:
    'じゅんいちさんの現場メモ（撮影経験から得た感覚）',
  practice:
    '練習課題（実際に手を動かす課題）',
  relatedIds: ['related-lesson-1', 'related-lesson-2'], // 関連教材の ID
}
```

### 追加後の反映

```bash
# ローカル環境では自動的にリロードされます
# 本番環境では、git push → Vercel の自動デプロイで反映されます
```

### 必須フィールド

- `id`: ユニークな ID（重複不可）
- `title`: 教材のタイトル
- `level`: 学習レベル
- `category`: カテゴリ
- `tags`: 検索用タグ
- `summary`: 一言要約
- `beginnerExplanation`: 初心者向け解説
- `fieldUse`: 現場での使い方
- `commonMistakes`: よくある失敗（配列）
- `junichiNote`: 現場メモ
- `practice`: 練習課題
- `relatedIds`: 関連教材 ID（配列）

---

## ローカル起動方法

### 前提条件

- Node.js v18 以上
- npm または yarn

### セットアップ

```bash
# 1. プロジェクトディレクトリに移動
cd grain

# 2. 依存パッケージをインストール
npm install

# 3. 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

### 開発中の変更

- `data/lessons.ts` を編集すると、自動的にページがリロードされます
- `components/`, `app/` のコンポーネントも同様に自動リロード対応です

---

## ビルド方法

### 本番用ビルド

```bash
# Next.js の本番ビルド（.next フォルダが生成される）
npm run build

# ビルド結果の確認（ローカルで本番環境をシミュレート）
npm run start
```

ブラウザで `http://localhost:3000` にアクセスして、本番環境と同じ状態を確認できます。

### ビルド成功時の出力例

```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Generated 39 pages (SSG)
✓ Build successful
```

---

## Vercel 公開 URL

**アプリケーション**: [https://grain-gamma.vercel.app](https://grain-gamma.vercel.app)

### Vercel への自動デプロイ

- GitHub にプッシュすると、Vercel が自動的にデプロイします
- デプロイ状態は [Vercel ダッシュボード](https://vercel.com/dashboard) で確認できます

### デプロイの流れ

```
git commit → git push → GitHub → Vercel webhook → 自動ビルド＆デプロイ
```

---

## 検索対象フィールド

`/search?q=xxx` で以下のフィールドから全文検索します：

- `title` — タイトル
- `tags` — タグ
- `summary` — 一言要約
- `beginnerExplanation` — まず何を覚える？
- `fieldUse` — 現場ではどう使う？

**例**:
- `/search?q=露出補正` → 露出補正関連の教材を検索
- `/search?q=白い` → 「白い服」などの教材を検索
- `/search?q=ストロボ` → ストロボ関連の教材を検索

---

## 今後の拡張予定

- [ ] 教材 50 本化（用語・失敗解決・ジャンル別の充実）
- [ ] Supabase への移行（データベース管理）
- [ ] ユーザーログイン・学習進捗管理
- [ ] 学習パス機能（初心者向け・中級者向けなど）
- [ ] 有料教材・会員限定コンテンツ
- [ ] 動画教材の埋め込み
- [ ] 写真添削機能
- [ ] AI チャット先生機能
- [ ] 講座申し込みページ
- [ ] SNS 連携（LINE・Instagram 導線）

---

## ライセンス

© 2024 GRAIN. All rights reserved.

---

## 作成・運営

**写真撮影指導**: じゅんいちさん（プロカメラマン）  
**アプリ開発**: Claude Code（Anthropic）

---

## サポート

質問や機能リクエストがある場合は、GitHub Issues で報告してください。


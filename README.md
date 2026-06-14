# GRAIN — 写真の知識を、感覚に変える。

写真初心者が「用語」「失敗」「撮りたい写真」「光」「レベル順」から、
撮影の基本を感覚で理解できる教本 Web アプリ。

---

## 概要

単なる写真用語辞典ではなく、**撮影現場で迷った時に「何を優先して考えればいいか」まで教える**教材アプリです。

各教材は以下の構成で書かれています。

1. **一言でいうと** — 核心を一文で
2. **まず何を覚える？** — 初心者向け解説
3. **現場ではどう使う？** — 実践的な判断
4. **よくある失敗** — ありがちなミスと対処
5. **じゅんいちさんの現場メモ** — 撮影経験から得た感覚
6. **練習課題** — 実際に手を動かす課題

---

## 技術構成

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 |
| データ管理 | ローカル TypeScript 配列（`data/lessons.ts`）|
| お気に入り | localStorage（キー: `grain_favorites`）|
| デプロイ | Vercel（予定）|

---

## フォルダ構成

```
grain/
├── app/
│   ├── page.tsx                # ホーム
│   ├── not-found.tsx           # 404 ページ
│   ├── terms/page.tsx          # 用語一覧（term + setting）
│   ├── troubles/page.tsx       # 失敗解決一覧
│   ├── genres/page.tsx         # 撮りたい写真
│   ├── lighting/page.tsx       # 光を学ぶ
│   ├── levels/page.tsx         # レベル順に学ぶ
│   ├── settings/page.tsx       # 設定早見表（静的テーブル）
│   ├── favorites/page.tsx      # お気に入り
│   ├── search/page.tsx         # 検索（/search?q=xxx）
│   └── lessons/[id]/page.tsx   # 教材詳細
├── components/
│   ├── CategoryCard.tsx        # ホームのカテゴリカード
│   ├── LessonCard.tsx          # 教材一覧カード
│   ├── SearchBar.tsx           # 検索バー
│   ├── FavoriteButton.tsx      # ☆/★ トグルボタン
│   ├── SectionTitle.tsx        # ページタイトル
│   ├── Tag.tsx                 # タグ表示
│   └── NavBar.tsx              # ボトムナビ
├── data/
│   └── lessons.ts              # 教材データ（20 本）
├── types/
│   └── lesson.ts               # Lesson 型定義
├── lib/
│   └── lessons.ts              # データアクセス関数 6 種
└── contexts/
    └── FavoritesContext.tsx    # お気に入り状態管理
```

---

## 起動方法

```bash
# Node.js v18 以上が必要

cd grain
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

---

## 教材データの追加方法

`data/lessons.ts` の配列に追加します。

```ts
{
  id: 'my-new-lesson',           // ユニーク ID（英数字・ハイフン）
  title: '教材タイトル',
  level: 'intro',                // intro / basic / intermediate / advanced / field
  category: 'term',              // term / trouble / genre / lighting / setting
  tags: ['タグ1', 'タグ2'],
  summary: '一言でいうと（カードに表示される）',
  beginnerExplanation: '初心者向けの解説（段落は \\n\\n で区切る）',
  fieldUse: '現場での使い方',
  commonMistakes: [
    'よくある失敗1',
    'よくある失敗2',
    'よくある失敗3',
  ],
  junichiNote: 'じゅんいちさんの現場メモ',
  practice: '練習課題',
  relatedIds: ['related-lesson-id'],  // 関連教材の id
}
```

追加後、ページをリロードするだけで反映されます。

---

## 検索対象フィールド

`/search?q=xxx` で以下のフィールドを全文検索します。

- `title`（タイトル）
- `tags`（タグ）
- `summary`（一言要約）
- `beginnerExplanation`（まず何を覚える？）
- `fieldUse`（現場ではどう使う？）

---

## 今後の拡張予定

- [ ] 教材 50 本化
- [ ] Supabase 移行（データベース管理）
- [ ] ユーザーログイン・進捗管理
- [ ] 有料教材・会員限定コンテンツ
- [ ] 動画教材の埋め込み
- [ ] 写真添削機能
- [ ] AI 先生機能（チャット）
- [ ] 講座申し込みページ
- [ ] LINE 登録導線
- [ ] Instagram 導線

# GRAIN 引き継ぎメモ

写真教本Webアプリ「GRAIN」MVP の開発進捗。次回はこのファイルを最初に読めば再開できます。

最終更新: 2026-06-09

---

## プロジェクト概要

- **コンセプト**: 写真の知識を、感覚に変える。（写真家のノート × ミニマル教本アプリ）
- **構成**: Next.js 16（App Router）/ TypeScript / Tailwind CSS v4
- **データ**: ローカル TypeScript 配列（`data/lessons.ts`、教材20本）
- **お気に入り**: localStorage（キー `grain_favorites`）

---

## 環境メモ（重要）

- **Node はシステムに未インストール**。`~/bin/fnm` 経由で使用する。
- 開発コマンドは必ず先頭で fnm を読み込む:
  ```bash
  eval "$(~/bin/fnm env)" && cd <project> && npm run dev
  ```
- Node v24.16.0 / npm 11.13.0
- curl はパスが通っていないので `/usr/bin/curl` を直接指定する。

---

## 実装済み（すべて動作確認済み）

### 画面（全10ページ）
- ホーム `/` … ビジュアルヘッダー（半逆光グラデーション）＋英字ラベル付きカテゴリカード7枚＋「まず、写真の見方を変える」ピックアップ
- 用語 `/terms`（term＋setting）/ 失敗 `/troubles` / 撮りたい写真 `/genres` / 光 `/lighting`
- レベル順 `/levels` / 設定早見表 `/settings` / お気に入り `/favorites` / 検索 `/search` / 教材詳細 `/lessons/[id]`
- 404 `not-found.tsx`（存在しないidで表示）

### 教材詳細ページ（直近の重点作業）
- 表示順: タイトル→レベル/カテゴリ→タグ→テキスト付きお気に入りボタン→一言でいうと→まず何を覚える？→現場ではどう使う？→よくある失敗→じゅんいちさんの現場メモ（FIELD NOTE）→練習課題（PRACTICE）→関連記事→次に読む→最下部ブックマークボタン
- 本文 `text-[13px] leading-[1.8]`（読みやすさ重視で調整済み）
- 上部＋最下部に `FavoriteButtonFull`（「☆ お気に入りに追加」⇄「★ 保存済み」）
- 関連記事から**自分自身を除外**（`.filter(l => l.id !== lesson.id)`）
- **「次に読む」**＝レベル順で次の1件（`getNextLesson()`、最後の教材では非表示）
- 最下部は layout `pb-28` でNavBarに被らない

### 機能
- 検索（title/tags/summary/beginnerExplanation/fieldUse を対象、日本語OK）
- お気に入り登録・解除（localStorage、ページ間で保持）

### デザイン
- カラートークン（`app/globals.css` の `@theme`）:
  - 背景 `#F8F7F4` / 文字 `#1F1F1F` / サブ `#6B6B6B` / 線 `#E5E0D8` / アクセント（ブラウン）`#8A6F4D` / カード `#FFFFFF`
- PCは中央寄せ最大幅 `480px`、ボトムナビ付き

### 品質
- `npx tsc --noEmit` … エラー0
- `npm run build` … 32ページ生成成功

---

## 主要ファイル

```
app/
  layout.tsx              max-w-480 / pb-28 / FavoritesProvider
  page.tsx                ホーム（ビジュアルヘッダー）
  globals.css             @theme カラートークン・hoverクラス
  not-found.tsx           404
  lessons/[id]/page.tsx   教材詳細（直近の重点）
  {terms,troubles,genres,lighting,levels,settings,favorites,search}/page.tsx
components/
  CategoryCard / LessonCard / SearchBar / SectionTitle / Tag
  FavoriteButton（小・アイコンのみ）/ FavoriteButtonFull（テキスト付き）/ NavBar
contexts/FavoritesContext.tsx   localStorage キー: grain_favorites
data/lessons.ts                 教材20本
types/lesson.ts                 Lesson 型
lib/lessons.ts                  取得・検索・getNextLesson 等
```

---

## 未完了 / 次にやるべきこと

### 最優先（ユーザー指示待ち）
- [ ] **Vercel へのデプロイ** … 全段階で「まだしない、こちらで指示する」と保留中。ユーザーのGO待ち。

### 改善候補（軽微・任意）
- [ ] ホーム「まずここから」のピックアップが固定3件（`all[0], all[8], all[18]`）→ 新着orランダム化
- [ ] NavBar のアイコンが記号（◎△○≡☆）→ 環境により表示差。SVGアイコン化を検討
- [ ] ビジュアルヘッダーは現在CSSグラデーションのプレースホルダー → 実写真が用意できたら差し替え

### 将来拡張（README記載済み・MVP範囲外）
- 教材50本化 / Supabase移行 / ログイン / 有料教材 / 動画 / 写真添削 / AI先生 / 講座申込 / LINE・Instagram導線

---

## 再開手順

```bash
eval "$(~/bin/fnm env)"
cd "/Users/jun/仕事書類関係/ビジネス/AI/Jobs/grain"
npm run dev
# http://localhost:3000
```

ブラウザ確認はスマホ幅390pxで。教材データを増やすときは `data/lessons.ts` に追記（idは英数字ハイフン、relatedIdsで関連付け）。

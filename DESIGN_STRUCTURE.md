# GRAIN デザイン構造ガイド
最終デザイン段階での一括更新を効率的に行うためのリファレンス

---

## 1. 色管理

### グローバル色トークン（`app/globals.css`）
```css
--color-g-bg:           #F6F2EA
--color-g-card:         #FFFDF8
--color-g-text:         #171717
--color-g-muted:        #7A7168
--color-g-faint:        #A9A093
--color-g-border:       #DDD4C6
--color-g-accent:       #6F4E2E
--color-g-accent-soft:  #EFE5D6
--color-g-dark-panel:   #181614
--color-g-dark-text:    #F7F2EA
```

### インラインカラーの現状
- **一元管理済み**: `globals.css` のトークン
- **ハードコード**（最終段階で一括更新予定）:
  - `/components`: 約2箇所（FavoriteButton系）
  - `/app/lessons/[id]/page.tsx`: 約10箇所
  - `/app/settings/page.tsx`: 約5箇所
  - `/app/not-found.tsx`: 約3箇所
  - `/app/favorites/page.tsx`: 約3箇所
  - 他: 各ページで約2〜3箇所

---

## 2. コンポーネント構成

### 更新済み（新パレット適用）
- ✅ `app/globals.css` - 基本カラートークン
- ✅ `app/page.tsx` - ホーム（ヒーロー＋カテゴリ）
- ✅ `components/CategoryCard.tsx`
- ✅ `components/LessonCard.tsx`
- ✅ `components/SearchBar.tsx`
- ✅ `components/NavBar.tsx`
- ✅ `components/SectionTitle.tsx`
- ✅ `components/FavoriteButton.tsx`
- ✅ `components/FavoriteButtonFull.tsx`

### 部分更新が必要（古い色が混在）
- ⚠️ `app/lessons/[id]/page.tsx` - メイン教材詳細ページ（機能優先のため未修正）
- ⚠️ `app/settings/page.tsx`
- ⚠️ `app/search/page.tsx`
- ⚠️ `app/favorites/page.tsx`
- ⚠️ `app/not-found.tsx`
- ⚠️ `app/levels/page.tsx`
- ⚠️ 各カテゴリページ（`/terms`, `/troubles`, `/genres`, etc.）

---

## 3. スタイル系統

### 角丸（Border Radius）
| 用途 | 値 | コンポーネント |
|------|-----|---|
| ヒーロー・大型パネル | `rounded-md` | ホーム画像領域 |
| カード | `rounded-md` | CategoryCard, LessonCard |
| バッジ・小要素 | `rounded` または `rounded-sm` | タグ、レベルバッジ |
| ボタン（お気に入り） | `rounded-full` | FavoriteButton |
| 入力欄 | `rounded-sm` | SearchBar |

### 枠線（Border）
| 用途 | 値 | コンポーネント |
|------|-----|---|
| カード枠 | `1px solid #DDD4C6` | CategoryCard, LessonCard |
| セクション区切り | `1px solid #DDD4C6` | ページ全体 |
| ナビ上部 | `1px solid #DDD4C6` | NavBar |
| ボタン | `1.5px solid` | FavoriteButtonFull |

### 影（Shadow）
| 用途 | 値 | 使用場所 |
|------|-----|---|
| Hover時（カード） | `0 4px 12px rgba(23, 23, 23, 0.05)` | lessons/categories (CSS) |
| 通常は影なし | - | ほぼ全て |

### 余白（Padding/Margin）
- **ページ外側**: `px-5` （スマホ対応20px）
- **カード内側**: `px-4 py-4`
- **セクション間**: `gap-2.5` 〜 `gap-6`

---

## 4. 最終デザイン段階での更新方法

### 方法 A: 色トークンのみ更新（推奨・最小工数）
```bash
# 1. globals.css のトークン値を全置換
# 2. 自動的に全コンポーネントに反映（CSS変数使用部分）
# 3. ハードコード部分は個別更新
```

### 方法 B: 完全リセット＋Tailwind カスタムカラー化
```js
// tailwind.config.ts に以下を追加
colors: {
  grain: {
    bg: '#F6F2EA',
    card: '#FFFDF8',
    text: '#171717',
    // ...
  }
}
```

---

## 5. 今後のデザイン変更の優先順位

### Phase 1: 色トークンのみ（工数: 低）
- globals.css の色値を変更
- CSS変数使用部分が自動反映
- ハードコード部分は簡易スクリプトで一括置換可能

### Phase 2: 角丸・枠線の統一（工数: 低〜中）
- 角丸を `rounded-md` / `rounded-sm` / `rounded-full` で統一
- 枠線を `border-1` クラスで統一
- Tailwind で `@apply` を活用

### Phase 3: 間隔・レイアウト（工数: 中）
- Padding, Margin を統一（8px単位）
- Gap を統一（`gap-2`, `gap-3`, `gap-4` 等）
- スマホ＼PC のレスポンシブ調整

---

## 6. ハードコード色の一覧

最終段階で以下を置換してください：

```
旧：新（全16個）
#F8F7F4 → #F6F2EA
#FFFFFF → #FFFDF8
#1F1F1F → #171717
#6B6B6B → #7A7168
#9E9E9E → #A9A093
#E5E0D8 → #DDD4C6
#8A6F4D → #6F4E2E
#C4B8A8 → #8B8270
#B0A898 → #8B8270
#A09888 → #7A7168
#C4B0A8 → #DDD4C6
#B5A89A → 新色（#8B8270）
#D4C9BC → 新色（#B5A89A）
#F4F0EB → #EFE5D6
#F4ECE8 → #EFE5D6
#F8F7F4 → #F6F2EA
```

---

## 7. CSS変数を使っているコンポーネント
- `app/globals.css` のトークン定義のみ
- コンポーネントは inline style または Tailwind

**改善案**: `colors.ts` で定義
```ts
// lib/colors.ts
export const COLORS = {
  bg: '#F6F2EA',
  card: '#FFFDF8',
  text: '#171717',
  // ...
}
```
→ コンポーネント: `style={{ color: COLORS.text }}`

---

## 8. チェックリスト（デザイン最終段階）

- [ ] globals.css のカラートークン更新
- [ ] ハードコード色の一括置換
- [ ] 角丸統一（rounded-* クラスで統一）
- [ ] 枠線統一（border-* クラスで統一）
- [ ] 影の調整（card hover 等）
- [ ] 余白・レイアウト最終調整
- [ ] TypeScript チェック: `npx tsc --noEmit`
- [ ] ビルド確認: `npm run build`
- [ ] ページ全体確認（PC＼Mobile）
- [ ] Vercel デプロイ


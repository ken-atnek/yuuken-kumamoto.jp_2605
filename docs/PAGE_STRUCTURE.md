# ページ構成メモ

## 共通

- Header
- Footer
- SVGスプライト: `src/components/SvgDefs.tsx`
- グローバルスタイル: `src/styles/globals.scss`

---

## トップページ `/`

| # | セクション | 主なファイル | 内容 |
|---|---|---|---|
| 1 | Hero | `src/components/Top/ContainerHero.tsx` | ファーストビュー、ロゴ、メインビジュアル |
| 2 | Concept | `src/components/Top/ContainerConcept.tsx` | コンセプト |
| 3 | Works | `src/components/Top/ContainerWorks.tsx` | 施工事例の一部表示、`/works/` への導線 |
| 4 | About | `src/components/Top/ContainerAbout.tsx` | 会社情報・関連リンク |
| 5 | Contact | `src/components/Top/ContainerContact.tsx` | 問い合わせ導線 |

ナビゲーション:

- `/`
- `/#ContainerConcept`
- `/works/`
- `/#ContainerAbout`
- `/#ContainerContact`

トップページ内アンカーは同一ページ内の移動なので、原則 sitemap には含めない。

---

## 施工事例ページ `/works/`

| # | セクション | 主なファイル | 内容 |
|---|---|---|---|
| 1 | 見出し | `src/app/works/page.tsx` | `WORKS` 見出し |
| 2 | 施工事例一覧 | `src/components/Works/WorksList.tsx` | カテゴリ別の施工事例一覧 |
| 3 | モーダル | `src/components/Works/WorksModal.tsx` | 施工事例画像の詳細表示 |

データ:

- `public/db/works/works.json`
- 型定義: `src/types/works.ts`
- 仕様: `docs/WORKS_SPEC.md`

---

## SEO対象ページ

- `/`
- `/works/`

`sitemap.ts` もこの2ページを基本対象とする。

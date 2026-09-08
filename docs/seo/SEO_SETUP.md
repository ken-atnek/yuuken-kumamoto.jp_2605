# SEO初期設定メモ

このファイルは、株式会社 雄建サイトのSEO設計メモです。  
コンテンツやメタ文言は後から調整する前提で、まずは必要項目の枠を管理します。

---

## サイト基本情報

- サイト名: 株式会社 雄建
- 会社名: 株式会社 雄建
- 現行サイトURL:
- ドメイン: `yuuken-kumamoto.jp`
- 公開URL: `https://yuuken-kumamoto.jp/`
- 公開ステータス:
- 案件種別: コーポレートサイト

---

## 公開前の確認項目

- 現行ページの `title` / `description` の確認
- 現行URL一覧の取得
- 引き継ぐURLと変更するURLの整理
- リダイレクト要否の確認
- 指名検索で使われている会社名・地域名表記の確認

---

## ページ別メタ情報

### トップページ `/`

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

### 施工事例 `/works/`

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

---

## トップページ内セクション

以下は同一ページ内のアンカー導線のため、原則 sitemap には個別URLとして含めない。

- concept: `/#ContainerConcept`
- about: `/#ContainerAbout`
- contact: `/#ContainerContact`

---

## 初期実装で必要なSEO項目

- `metadata`
- `robots.ts`
- `sitemap.ts`
- OGP画像の管理方針
- canonical設計
- 会社名・地域名・事業領域の表記ゆれ整理

---

## デモ公開 / 本番公開の切り替え方針

- デモ公開時と本番公開時で、SEO系の出力を切り替える
- 判定は `NEXT_PUBLIC_IS_REAL_PROD` を使う
- `true` の時だけ本番SEOを有効にする
- `false` の時はデモ公開扱いにして `noindex` 系にする

### 基本方針

- `src/lib/env.ts` に `isRealProduction` と `metadataBase` を用意する
- `src/app/layout.tsx` の `metadata` は `isRealProduction` で分岐する
- 本番時だけ `metadataBase` / `openGraph` を有効にする
- デモ時は `robots: 'noindex, nofollow'` を返す
- `src/app/robots.ts` はデモ時に `disallow: '/'` を返す
- `src/app/sitemap.ts` はデモ時に空配列を返す

### 想定ファイル

- `src/lib/env.ts`
- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

### `src/lib/env.ts` 例

```ts
export const isRealProduction =
  process.env.NEXT_PUBLIC_IS_REAL_PROD === 'true';

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_METADATA_BASE ?? 'https://yuuken-kumamoto.jp/'
);
```

### `layout.tsx` 側の考え方

- `metadataBase` は本番時だけ `metadata` に設定する
- OGP URL や canonical の基準URLも本番時だけ有効にする
- デモURLを検索エンジンに正規URLとして認識させない

### 注意点

- `NEXT_PUBLIC_METADATA_BASE` は `build:demo` / `build:prod` で切り替える
- `NEXT_PUBLIC_METADATA_BASE` は末尾 `/` の有無に依存しないように扱う
- `robots.ts` と `sitemap.ts` のURL生成は文字列連結ではなく `new URL()` を使う
- デモ時に `metadataBase` を常時出すと、意図しないURLで canonical / OGP が生成されやすい
- `robots.ts` と `sitemap.ts` は `force-static` を付けた上で、本番判定を合わせる
- GA4 などの計測タグは本番時だけ読み込む

---

## 注意点

- 仮公開中は `noindex` を維持する
- 本番URL確定前に canonical を仮置きしすぎない
- title / description は後から差し替え前提でOK
- 地域名・施工種別・会社名を含む主要キーワードは早めに整理する

# 株式会社 雄建 Webサイト

Next.js App Router + TypeScript + SCSS による静的書き出しサイト。

公開サーバーでは静的HTMLとして配信し、施工事例などの更新データは `public/db` 配下の JSON をクライアントで取得する。

## 開発

```bash
npm run dev
```

## ビルド

通常確認:

```bash
npm run build
```

デモ用:

```bash
npm run build:demo
```

本番用:

```bash
npm run build:prod
```

## 主な構成

- `src/app/page.tsx`: トップページ
- `src/app/works/page.tsx`: 施工事例ページ
- `src/app/robots.ts`: robots.txt
- `src/app/sitemap.ts`: sitemap.xml
- `src/components/Top/`: トップページ各セクション
- `src/components/Works/`: 施工事例一覧・モーダル
- `src/styles/`: SCSS
- `public/db/works/works.json`: 施工事例データ
- `public/db/works/images/`: 施工事例画像

## 重要ルール

- `output: 'export'` を維持する
- `trailingSlash: true` を維持する
- `images: { unoptimized: true }` を維持する
- `public/db` のJSONはクライアントで取得する
- JSON更新だけで再ビルドが必要になる実装にしない
- SEO系は `NEXT_PUBLIC_IS_REAL_PROD` でデモ / 本番を切り替える

## 参照md

- `AGENTS.md`
- `docs/PAGE_STRUCTURE.md`
- `docs/WORKS_SPEC.md`
- `docs/BACKEND_HANDOFF.md`
- `docs/seo/SEO_SETUP.md`

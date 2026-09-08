## チェックリスト

作業開始前に確認:

- [ ] `next.config.ts` に `output: 'export'` がある
- [ ] `trailingSlash: true` がある
- [ ] `images: { unoptimized: true }` がある
- [ ] 動的ルートで `params` を使う場合は Next 16 の Promise 扱いに対応している
- [ ] `generateMetadata` / `generateStaticParams` を不要に複雑化していない
- [ ] `force-dynamic` を使っていない
- [ ] `public/db` のJSON取得はクライアント fetch を基本にしている
- [ ] 施工事例JSONの型は `src/types/works.ts` を参照している
- [ ] デモ / 本番のSEO切り替えは `NEXT_PUBLIC_IS_REAL_PROD` を使っている
- [ ] `robots.ts` / `sitemap.ts` には `force-static` を付けている

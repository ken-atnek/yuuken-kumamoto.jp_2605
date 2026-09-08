# 作業メモ

## 2026-09-08

### SEO / robots / sitemap 整理

- ふもと旅館プロジェクトを参考に、SEO系の出力切り替え方針を追加
- `src/lib/env.ts` に `isRealProduction` と `metadataBase` を用意
- `src/app/robots.ts` と `src/app/sitemap.ts` を追加
- デモ時は `robots.txt` を `Disallow: /`、`sitemap.xml` を空にする方針
- 本番時は `https://yuuken-kumamoto.jp/` を基準URLにする方針

### SEO md 追加

- `docs/seo/SEO_SETUP.md`
- `docs/seo/SEO_AUDIT_REQUEST_TEMPLATE.md`
- `docs/seo/SEO_FIX_TRACKER_TEMPLATE.md`

### 管理画面 / DB連携系 md 追加

- `control.yamagarotenyu-momiji.com` のmdを参考に、雄建用の引き渡しメモとレビュー管理mdを追加
- `docs/BACKEND_HANDOFF.md`
- `docs/review/REVIEW_REQUEST_TEMPLATE.md`
- `docs/review/REVIEW_FIX_TRACKER.md`

### 注意

- `public/db/works/works.json` と `src/components/Top/ContainerContact.tsx` は、既存の未コミット変更があるため今回のmd追加では触っていない
- 管理画面固有の `SPEC.md` / `DESIGN.md` / `LAYOUT_TEMPLATE.md` は、雄建サイト本体にそのまま入れると内容がズレるためコピーしていない

### 開発確認 / ビルド運用

- 基本作業中はユーザー側で `npm run dev` を起動し、チェック画面を確認している
- AI側では `npm run build` / `npm run build:demo` / `npm run build:prod` は実行しない
- ビルド確認が必要なタイミングでは、AI側からユーザーへ実行を依頼する

### レビュー作業ルーティン

- プログラムチェック、公開前チェック、Claudeなどの外部レビュー後の対応では、`docs/review/REVIEW_YYYY-MM-DD.md` を作成または更新する
- レビューmdの冒頭には `進捗サマリー` を置き、`✅` / `⏳` / `⚠️` / `⬜` で作業状況が見えるようにする
- 対応した項目はレビューmd側も更新し、ユーザーが作業感と残タスクを追えるようにする

### 共通プレイブック運用

- React / Next.js 制作案件の共通ルールは `/Users/ken/site_data/__react-nextjs-playbook/` に集約する
- 各案件のmdは、共通ルールへの参照と案件固有の注意点を残す位置づけにする
- 他案件からmdを流用して良かったルールは、案件内だけでなく共通プレイブックにも反映して育てる

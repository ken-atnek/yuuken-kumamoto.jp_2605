# Claude Instructions

作業開始時は必ず以下の順で確認してから作業すること。

1. `AGENTS.md`
2. `docs/WORKS_SPEC.md`
3. `docs/PAGE_STRUCTURE.md`
4. `docs/rules/tsx-comment-rules.md`（`tsx` 編集時）
5. `docs/rules/project-setup.md`
6. `docs/rules/coding-style.md`
7. `docs/rules/nextjs-export.md`
8. `docs/rules/fetch-pattern.md`
9. `docs/rules/ui-interactions.md`
10. `docs/rules/checklist.md`
11. `docs/seo/SEO_SETUP.md`
12. `docs/seo/SEO_AUDIT_REQUEST_TEMPLATE.md`
13. `docs/seo/SEO_FIX_TRACKER_TEMPLATE.md`
14. `docs/BACKEND_HANDOFF.md`
15. `docs/review/REVIEW_REQUEST_TEMPLATE.md`（外部レビュー依頼時）
16. `docs/review/REVIEW_FIX_TRACKER.md`（外部レビュー反映時）
17. `docs/MEMORY.md`

必須ルール（最優先）:

- `next.config.ts` の `output: 'export'` を維持する
- Tailwind CSS は使用しない（SCSSで実装）
- 依頼範囲外の大幅リファクタはしない
- SEO系は `NEXT_PUBLIC_IS_REAL_PROD` でデモ / 本番の出力を切り替える
- `public/db` のJSONは管理画面・DB側が生成する前提で、公開側はクライアントfetchを基本にする

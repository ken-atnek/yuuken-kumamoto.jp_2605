# 外部レビュー修正トラッカー

- 実施日: 2026-09-08
- 指摘元: Claude
- 原文: `docs/review/EXTERNAL_REVIEW_CLAUDE_2026-09-08.md`

## 進捗サマリー

| 状態          | 件数 |
| ------------- | ---: |
| ✅ 対応済み   |    6 |
| ⏳ 再確認待ち |    2 |
| ⚠️ 要確認     |    4 |
| ⬜ 未対応     |    1 |
| 対応不要      |    4 |

## 管理テーブル

| ID   | 優先度 | 指摘内容                                         | 対象ファイル                                            | 対応方針                                                            | ステータス    | 備考                                                                         |
| ---- | ------ | ------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------- |
| R-01 | 高     | 問い合わせ結果モーダルの背景操作・フォーカス制御 | `src/components/Modal.tsx`                              | スクロールロック、ハンバーガー非表示、Tab制御、フォーカス復帰を追加 | ✅ 対応済み   | ローカル表示でTab・Esc・フォーカス復帰・ハンバーガー非表示を確認済み         |
| R-02 | 高     | 問い合わせフォームの入力欄にラベル関連付けがない | `src/components/Top/ContainerContact.tsx`               | `dt`内の`label`と各フォーム要素の`id`を関連付ける                   | ✅ 対応済み   | ローカル表示のアクセシビリティツリーで全項目の名前を確認済み                 |
| R-03 | 高     | `id="logoTitle"`が同一ページ内で重複             | `ContainerHero.tsx`、`ContainerAbout.tsx`、`Footer.tsx` | コンポーネントごとに一意なIDへ変更                                  | ✅ 対応済み   | 参照側の`aria-labelledby`も変更済み                                          |
| R-04 | 中     | タブレット縦・スマホ横の表示崩れの懸念           | 各SCSS、`Header.module.scss`                            | 実表示を確認して、必要な箇所のみ調整                                | ⚠️ 要確認     | コードだけでは不具合を断定できないため未変更                                 |
| R-05 | 中     | 施工事例モーダルの矢印がスマホで切れる懸念       | `WorksModal.module.scss`                                | 480px以下で実表示・タップ領域を確認後に判断                         | ⚠️ 要確認     | デザインに影響するため未変更                                                 |
| R-06 | 中     | 空カテゴリの表示抑制が未実装                     | `ContainerWorks.tsx`、`WorksList.tsx`                   | 空カテゴリをmap前に除外                                             | ✅ 対応済み   | AGENTS.md記載仕様へ統一                                                      |
| R-07 | 中     | PHPにテスト用個人メールアドレスのコメントが残る  | `public/backend/contact.php`                            | 該当コメントを削除                                                  | ✅ 対応済み   | `out/backend/contact.php`には該当記述なし。PHP実行環境がなく構文検査は未実施 |
| R-08 | 中     | 本番サーバーの`/db`同期に依存                    | `package.json`、公開サーバー                            | 公開直前に`/db`の存在と最新性を確認                                 | ⏳ 再確認待ち | コード変更なし。既存運用を継続                                               |
| R-09 | 中     | タッチ端末でサムネイルhoverが残る                | `WorksModal.module.scss`                                | 既存の`hover` mixinへ変更                                           | ⏳ 再確認待ち | Stylelint正常。タッチ端末で確認する                                          |
| R-10 | 低     | サイト全体にh1がない                             | 各ページ                                                | ページ見出し設計を確認して判断                                      | ⚠️ 要確認     | 見出し階層・デザインに関わるため未変更                                       |
| R-11 | 低     | Twitter Card未設定                               | `src/app/layout.tsx`                                    | 本番時に`summary_large_image`とOGP画像を設定                        | ✅ 対応済み   | TypeScript・ESLint正常                                                       |
| R-12 | 低     | Header/Footerのナビゲーション実装差              | `Header.tsx`、`Footer.tsx`                              | 既存実装を維持                                                      | 対応不要      | Header固有の開閉・スクロール処理があり、実害もないため統一しない             |
| R-13 | 低     | `ScrollLink.tsx`が未使用                         | `src/components/common/ScrollLink.tsx`                  | 既存ファイルを維持                                                  | 対応不要      | 未使用だけを理由に削除しない                                                 |
| R-14 | 低     | `tel:`/`mailto:`にも別タブ指定                   | `ExternalLink.tsx`                                      | 現行仕様を確認して分岐追加を判断                                    | ⚠️ 要確認     | 挙動変更になるため未変更                                                     |
| R-15 | 低     | `.splideArrows`が未使用                          | `WorksModal.module.scss`                                | 現状維持                                                            | 対応不要      | 表示への影響がなく、削除のみの変更は行わない                                 |
| R-16 | 低     | `.box_btn`のみ命名規則外                         | `PageTop.module.scss`、`ContainerContact.tsx`           | 現行名を維持                                                        | 対応不要      | 命名変更は既存実装への影響が大きく、実害もない                               |
| R-17 | 低     | TSXコメントヘッダーの不足・誤記                  | 複数TSX                                                 | 機能修正で触るファイルから段階的に整備                              | ⚠️ 要確認     | `Modal.tsx`のみ今回整備済み                                                  |

## 実装ログ

### 2026-09-08

- 対応ID: R-01、R-02、R-03、R-06、R-07、R-09、R-11
- 実施内容: 外部レビューを実装と照合し、仕様確認不要な指摘を最小修正
- 変更ファイル: `src/app/layout.tsx`、`src/components/Modal.tsx`、`src/components/Top/ContainerContact.tsx`、`src/components/Top/ContainerHero.tsx`、`src/components/Top/ContainerAbout.tsx`、`src/components/common/Footer.tsx`、`src/components/Top/ContainerWorks.tsx`、`src/components/Works/WorksList.tsx`、`src/components/Works/WorksModal.module.scss`、`public/backend/contact.php`
- 確認方法: `npx tsc --noEmit`、`npm run lint`、対象ファイルのPrettier、対象SCSSのStylelint、ローカルブラウザのアクセシビリティツリーとキーボード操作
- 結果: コードチェックはすべて正常。R-01はTab・Esc・フォーカス復帰・ハンバーガー非表示、R-02は全フォーム項目のアクセシブルネームを確認済み。`php -l`はローカルにPHPコマンドがないため未実施

## 判断待ち

- R-04、R-05は実機またはDevToolsで現象確認後に修正要否を判断する
- R-10はページのh1設計を決めてから対応する
- R-14は`tel:`・`mailto:`リンクの別タブ指定を変更してよいか確認する
- 施工事例`new-construction / 003`のサムネイルが1枚目の画像と異なる点は、意図した選定か確認する
- JSON取得失敗時に施工事例を非表示とする現行仕様を継続するか確認する

## 次回確認

- スマホ横向き・タブレット縦向きでハンバーガーメニューが収まること
- スマホで施工事例モーダルの左右矢印が表示・操作できること
- タッチ端末で施工事例サムネイルのhover表示が残らないこと
- 本番サーバー上の`/db`が存在し、最新であること

# 公開前コードレビュー結果（雄建サイト / 2026-09-08）

対象: `/Users/ken/site_data/xbaf8039.xbiz.jp/yuuken-kumamoto.jp/public_html/2605`
構成: Next.js 16.2.2 (App Router) / TypeScript / SCSS / `output: 'export'`

読み取り専用で実施。`npm run build` 系は実行せず、`npx tsc --noEmit` と `npm run lint` のみ実行（いずれもエラー0件）。

---

## 1. 進捗サマリー

| 状態 | ID | 重要度 | 項目 |
|---|---|---|---|
| ⚠️ | R-01 | 高 | 問い合わせ完了/警告モーダルにスクロールロック・フォーカストラップがない |
| ⚠️ | R-02 | 高 | 問い合わせフォームの入力欄に label/aria-label がない |
| ⚠️ | R-03 | 高 | `id="logoTitle"` がトップページ内で3重複 |
| ⚠️ | R-04 | 中 | タブレット縦・スマホ横のブレークポイントが未使用でレイアウト崩れの懸念 |
| ⚠️ | R-05 | 中 | 施工事例モーダルの矢印ボタンがスマホでクリップされる懸念 |
| ⚠️ | R-06 | 中 | 空カテゴリの表示抑制が未実装（AGENTS.md矛盾） |
| ⚠️ | R-07 | 中 | contact.php に個人メールアドレスのコメントが残存 |
| ⚠️ | R-08 | 中 | 本番 `/db` 同期に依存する運用リスク（既存レビューmdでも再確認待ち） |
| ⚠️ | R-09 | 中 | サムネイルhoverがタッチ端末でsticky hoverになる |
| ⬜ | R-10〜R-17 | 低 | h1不在、Twitter Card未設定、命名/デッドコード/ドキュメント記載漏れ等 |

致命的（ビルド不可・公開不可レベル）の問題は確認されなかった。TypeScript・ESLintはクリーン、静的export・SEO切替・DB連携の基本方針は仕様md通りに実装されている。

---

## 2. 致命的な問題

なし。

---

## 3. 優先度「高」の問題

### R-01. 問い合わせ結果モーダルにスクロールロック・フォーカストラップがない

- 重要度: 高
- 対象: `src/components/Modal.tsx`（全体）
- 内容: `src/components/Works/WorksModal.tsx:50-68` は `document.body.style.overflow='hidden'` と `body.classList.add('modal-open')` をuseEffectで付与・解除しているが、問い合わせフォームの完了/警告/確認メッセージに使う `Modal.tsx` にはこの処理が一切ない。`role="dialog" aria-modal="true"`（`Modal.tsx:41-43`）は付いているが実態が伴っていない。
- 実際の影響: モーダル表示中も背景ページがスクロール可能。さらに `Header.module.scss:105-107` の `body.modal-open` によるハンバーガーボタン非表示制御が効かないため、**モーダル表示中でも右上のハンバーガーボタン（z-index:400 > Modalのz-index:100）が操作可能**で、メニューを開いて別ページへ遷移できてしまう。フォーカストラップもないためTabキーでモーダル外に出られる。
- 再現条件: トップページの問い合わせフォームを未入力のまま送信 → 警告モーダル表示中に右上のハンバーガーボタンをクリック。
- 最小修正案: `Modal.tsx` の `useEffect`（21-35行目）内に、`WorksModal.tsx:50-68` と同様の `document.body.style.overflow='hidden'` / `body.classList.add('modal-open')` の付与とクリーンアップでの解除を追加する。
- 仕様確認: 不要（既存の `WorksModal.tsx` と同等の実装に揃えるだけの最小修正）。

### R-02. 問い合わせフォームの入力欄に label/aria-label がない

- 重要度: 高
- 対象: `src/components/Top/ContainerContact.tsx:314-415`
- 内容: お名前・ふりがな・住所・電話番号・メールアドレス・お問い合わせ内容の各入力欄は `<dt>ラベル</dt><dd><input .../></dd>` という視覚的レイアウトのみで、`<label htmlFor>` や `id`、`aria-label`/`aria-labelledby` が付与されていない（`grep -n "htmlFor\|<label"` はヒットなし）。
- 実際の影響: スクリーンリーダー利用者が各入力欄にフォーカスした際、フィールド名（「お名前」等）が読み上げられない。`placeholder` は入力後に消えるため代替にならない。
- 再現条件: VoiceOver等のスクリーンリーダーでフォームの各inputにフォーカスして確認。
- 最小修正案: 各inputに一意のid（例: `contact-name`）を付与し、対応する `dt` を `<label htmlFor="contact-name">` に変更する。もしくは `dd` に `aria-labelledby` で `dt` のidを参照させる。
- 仕様確認: 不要。

### R-03. `id="logoTitle"` がトップページ内で3重複

- 重要度: 高
- 対象: `src/components/Top/ContainerHero.tsx:29`、`src/components/Top/ContainerAbout.tsx:18`、`src/components/common/Footer.tsx:15`
- 内容: いずれも `<title id="logoTitle">株式会社 雄建</title>` としており、`aria-labelledby="logoTitle"` で参照している。トップページ (`src/app/page.tsx`) では `ContainerHero` と `ContainerAbout` が両方レンダリングされ、`Footer` は `layout.tsx` で常時レンダリングされるため、**同一ページ内に `id="logoTitle"` が3箇所存在**する。
- 実際の影響: HTML仕様上id重複は無効。`aria-labelledby="logoTitle"` は最初に出現する要素（Hero側）としか正しく関連付けられない可能性があり、About/Footerのロゴがスクリーンリーダーで無名として読み上げられる恐れがある。
- 再現条件: トップページ（`/`）をDevToolsのAccessibility Treeまたはスクリーンリーダーで確認。
- 最小修正案: 各コンポーネントで一意なidに変更する（例: `logoTitleHero` / `logoTitleAbout` / `logoTitleFooter`）。`aria-labelledby` 側の参照も合わせて変更する。
- 仕様確認: 不要。

---

## 4. 優先度「中」の問題

### R-04. タブレット縦・スマホ横のブレークポイントが未使用

- 重要度: 中
- 対象: `src/styles/foundation/_breakpoints.scss:1-43`、全コンポーネントSCSS Modules
- 内容: `tbw`（1194px以下・横向き）、`tb`（834px以下・縦向き）、`spw`（928px以下・横向き）の3mixinが定義されているが、`grep -rn "@include tbw\|@include tb \|@include spw" src` は `globals.scss` の2箇所のみでコンポーネント側では未使用。`sp` mixin も `max-width: 480px` かつ `orientation: portrait` の条件（`_breakpoints.scss:39-42`）のため、**タブレット縦（768〜834px）とスマホ横向き全般では `sp` が発火せず、PC相当の固定remサイズがそのまま適用される**。
- 実際の影響（具体例）: `src/components/common/Header.module.scss:19-24` のハンバーガーメニュー `--box-height: 57rem`（570px固定、html `font-size:62.5%` により `1rem=10px`）は `sp`（縦向きスマホのみ）でのみ `60vh` に変わる。横向きスマホ（幅667〜926px・高さ375〜428px程度）ではビューポート高さを大きく超えるが縮小されず、メニュー下部の項目（contactなど）が画面外にはみ出す可能性が高い。同様に `src/styles/PageTop.module.scss:207` の `.thumbItem { height: 50rem; }`、`404` の `dl { width: 58rem; }` もタブレット縦で崩れやすい。
- 再現条件: iPhone等を横向きにしてハンバーガーメニューを開く／iPad縦向き(768〜834px)でトップページを表示する。
- 最小修正案: 影響の大きいHeader/PageTopの該当箇所に限定して `spw`（横向きスマホ）または `tb`（タブレット縦）のメディアクエリを追加する。全SCSSへの一括適用は範囲が広くなるため今回は対象外とし、実機確認の上で必要箇所のみ段階対応を推奨。
- 仕様確認: 要確認。実機/DevToolsでの表示確認を先に行い、崩れが実際に起きるか確認した上で対応要否を判断されたい。

### R-05. 施工事例モーダルの矢印ボタンがスマホでクリップされる懸念

- 重要度: 中
- 対象: `src/components/Works/WorksModal.module.scss:22-26`（`.overlay` の `sp` 時 `overflow-x: hidden`）、`56-59`（`.inner { width: 86vw; }` は `sp` 未定義箇所、実質86vw時のまま）、`177-190`（矢印ボタン `left/right: -6vw`）
- 内容: `sp`（480px以下・縦向き）で `.overlay` に `overflow-x: hidden` が付与される一方、Splideの左右矢印ボタンは `.mainSlider` 基準で `left/right: -6vw` の位置に配置される。画面端からのクリップにより矢印ボタンの一部〜大部分がタップできなくなる可能性がある。
- 実際の影響: スマホで施工事例モーダルを開いた際、画像切り替え用の矢印ボタンが操作しづらい、またはタップ不能になる可能性。
- 再現条件: 480px以下の縦向きスマホ（または相当するDevToolsのビューポート）で `/works/` からモーダルを開き、左右の矢印ボタンをタップして確認。
- 最小修正案: 実機/DevToolsで実際のクリップ具合を確認した上で、`sp` 時の矢印位置（`left/right: -6vw`）を `.overlay` の余白内に収まる値に調整する、または `.overlay` に左右方向の最小余白を追加する。
- 仕様確認: 要確認。実機表示確認が先。

### R-06. 空カテゴリの表示抑制が未実装（AGENTS.md矛盾）

- 重要度: 中
- 対象: `src/components/Top/ContainerWorks.tsx:39-104`、`src/components/Works/WorksList.tsx:44-54`
- 内容: `AGENTS.md`（264-266行目）に「施工事例の `items.length === 0` の時は、そのカテゴリの一覧表示を抑制する」と明記されているが、`ContainerWorks.tsx` はカテゴリごとの `items.length` チェックを一切行わずカテゴリブロック（見出し・矢印リンク）を常に描画する。`WorksList.tsx:56` はアイテムグリッド (`<ul>`) 自体は `category.items.length > 0` で制御しているが、`44-54行目` のカテゴリ見出し（`categoryHeader`）は `items.length` に関わらず常に表示される。
- 実際の影響: 現状の `works.json` は全カテゴリに1件以上あるため即座には顕在化しないが、将来カテゴリのitemsが0件になった場合、空のサムネイル枠や見出しだけが残る。
- 再現条件: `public/db/works/works.json` のいずれかのカテゴリの `items` を空配列にして表示確認（デモ確認のみ、実データは変更しないこと）。
- 最小修正案: `ContainerWorks.tsx` の `data.categories.map` 内、および `WorksList.tsx` の `data.categories.map` 内で、`category.items.length === 0` の場合はそのカテゴリブロック全体を描画しない（`return null` 相当）よう条件を追加する。
- 仕様確認: 不要（mdに明記済みの仕様との整合を取るだけ）。

### R-07. contact.php に個人メールアドレスのコメントが残存

- 重要度: 中
- 対象: `public/backend/contact.php:104`（`out/backend/contact.php` にも同内容が複製済み）
- 内容: `// $to = 'ken.atnek@gmail.com';       // テスト` というコメントアウトされたテスト用メールアドレスが残っている。実行には影響しないが、公開サーバーに配置されるPHPファイル内に個人メールアドレスが平文で残る。
- 実際の影響: PHPが何らかの理由でソースのまま配信された場合や、リポジトリを公開する場合に個人情報が露出するリスク。
- 再現条件: ファイルを直接開いて確認。
- 最小修正案: 該当コメント行を削除する。
- 仕様確認: 不要。

### R-08. 本番サーバー `/db` 同期に依存する運用リスク

- 重要度: 中（コードバグではなく運用リスク）
- 対象: `package.json:8-9`（`build:demo` / `build:prod` の `rimraf out/404.html out/404 out/db`）
- 内容: 本番/デモビルドは `out/db` を意図的に削除する設計（FTPミラーリングで公開サーバー上の `/db` を誤削除しないため）。これは `docs/review/REVIEW_2026-09-08.md`（項目2）にも記載済みで、既に「⏳ 再確認待ち」のまま残っている。
- 実際の影響: 本番サーバー上に `/db`（`works.json` と画像一式）が存在しない、または古い場合、`src/components/Top/ContainerWorks.tsx:28-30` / `src/components/Works/WorksList.tsx:32-34` は `catch` で `console.error` するのみでユーザー向けエラー表示が無いため、**施工事例セクションがサイレントに全消滅する**（`return null`、`ContainerWorks.tsx:33` / `WorksList.tsx:37`）。
- 再現条件: 本番サーバーの `/db` が未配置の状態でトップページ・`/works/` を表示。
- 最小修正案: コード修正ではなく運用手順の徹底。公開前に本番サーバー上の `/db` の実在・最新性を必ず目視確認する（既存レビューmdの公開直前チェック手順にも記載済み）。
- 仕様確認: 要確認（運用フローの再徹底で足りるか、ユーザー向けエラー表示を追加すべきかは判断が必要）。

### R-09. サムネイルhoverがタッチ端末でsticky hoverになる

- 重要度: 中
- 対象: `src/components/Works/WorksModal.module.scss:213-216`
- 内容: `src/styles/foundation/_interaction.scss` に `@include hover { @media (hover: hover) {...} }` という保護付きmixinがあり、他のホバー実装（同ファイル173-175行目の矢印ボタン等）はこれを使っているが、サムネイルの `&:hover { opacity: 0.7; }` だけは素の `:hover` を使っており保護されていない。
- 実際の影響: iOS Safari等タッチ端末で、サムネイルをタップした際に `:hover` が擬似的に発火し、他の箇所をタップするまで「ホバー状態」の見た目（半透明解除）が残留する。
- 再現条件: iPhone SafariでWorksモーダルのサムネイルをタップして確認。
- 最小修正案: `&:hover { opacity: 0.7; }` を `@include hover { opacity: 0.7; }` に変更する。
- 仕様確認: 不要。

---

## 5. 優先度「低」の問題

### R-10. h1がサイト全体に存在しない

- 重要度: 低
- 対象: 全ページ（`grep -rn "<h1" src` で該当なし）
- 内容: トップページ・`/works/` とも最上位見出しはh2（`ContainerConcept.tsx:16` 等）から始まっており、h1が一つも存在しない。
- 実際の影響: SEO・支援技術のランドマークナビゲーション上、ページ主題を示す最上位見出しがない。
- 最小修正案: ロゴ/ヒーロー領域相当にvisually-hiddenのh1（例:「株式会社雄建 コーポレートサイト」）を追加する、またはページタイトルに相当する要素をh1化する。
- 仕様確認: 要確認（デザイン上ロゴをh1相当にする意図があるか、追加してよいか確認が必要）。

### R-11. Twitter Card (metadata.twitter) 未実装

- 重要度: 低
- 対象: `src/app/layout.tsx:56-88`
- 内容: OGP (`og:image`等) は実装済みだが `metadata.twitter` が未設定（`grep -rn "twitter" src` はヒットなし）。
- 実際の影響: X（旧Twitter）でシェアした際にOGP画像・タイトルの表示が最適化されない可能性がある。
- 最小修正案: `layout.tsx` の `metadata` に `twitter: { card: 'summary_large_image', ... }` を追加する。
- 仕様確認: 不要（追加のみの小さい変更）。

### R-12. Header/Footerでナビゲーション実装が不統一

- 重要度: 低
- 対象: `src/components/common/Header.tsx:73-83`（`next/link` + スムーズスクロール処理）、`src/components/common/Footer.tsx:20-26`（生の `<a href>`、スムーズスクロール処理なし）
- 内容: 同じ `navMenu` データを異なる実装で描画している。スマホでは `Footer.module.scss:47-49` により `nav` 自体が非表示のため実害は限定的。
- 最小修正案: 提案のみに留める（AGENTS.mdの「依頼範囲外の改善は実装せず提案止まり」方針のため）。
- 仕様確認: 要確認（意図的な差か確認が必要）。

### R-13. `ScrollLink.tsx` が未使用（デッドコード疑い）

- 重要度: 低
- 対象: `src/components/common/ScrollLink.tsx`
- 内容: プロジェクト全体でどこからも呼び出されていない（`grep` で使用箇所0件）。
- 最小修正案: 使用予定がなければ削除候補（提案のみ）。
- 仕様確認: 要確認（今後使う予定があるか）。

### R-14. `ExternalLink` がtel:/mailto:にも `target="_blank"` を一律付与

- 重要度: 低
- 対象: `src/components/common/ExternalLink.tsx:7-11`
- 内容: `tel:`/`mailto:` リンク（`Footer.tsx:29-45` 等）にも `target="_blank" rel="noopener noreferrer"` が付与される。
- 実際の影響: 環境によっては空白タブが残る場合がある（実害小）。
- 最小修正案: `tel:`/`mailto:` の場合はtarget属性を付与しない分岐を追加する。
- 仕様確認: 要確認（意図的な仕様か確認が必要）。

### R-15. `.splideArrows` クラスが `:global()` されておらず未使用

- 重要度: 低
- 対象: `src/components/Works/WorksModal.module.scss:142-144`
- 内容: `.mainSlider .splideArrows { display: none; }` はCSS Modulesでローカルスコープ化されるため、Splideが実際に出力するグローバルクラス `splide__arrows` には一致せずデッドコードになっている。TSX側からも `styles.splideArrows` は参照されていない。
- 最小修正案: 不要であれば削除する（提案のみ）。
- 仕様確認: 不要。

### R-16. `.box_btn` のみスネークケースで命名規則が不統一

- 重要度: 低
- 対象: `src/styles/PageTop.module.scss`（611, 627, 674行目付近）
- 内容: `docs/rules/coding-style.md` ではCSS Modulesのクラスはキャメルケースが規則だが、`.box_btn` のみスネークケース。`src/components/Top/ContainerContact.tsx:275,418` でも `styles.box_btn` として参照されている。
- 最小修正案: 命名統一は既存クラス名の変更を伴い影響範囲が広がるため、今回は提案のみに留める。
- 仕様確認: 要確認（リネームしてよいか判断が必要）。

### R-17. TSXコメントヘッダーの記載漏れ・誤記

- 重要度: 低
- 対象:
  - ヘッダー自体が無い: `src/app/template.tsx`、`src/components/SvgDefs.tsx`、`src/components/Modal.tsx`、`src/components/common/ExternalLink.tsx`（1行コメントのみ）、`src/components/common/ScrollLink.tsx`
  - `Referenced in: :` の二重コロン誤記: `src/components/Top/ContainerAbout.tsx:4`、`ContainerContact.tsx:4`、`ContainerConcept.tsx:4`、`ContainerHero.tsx:4`
- 内容: `docs/rules/tsx-comment-rules.md` のルール（`src/**/*.tsx` 先頭にヘッダーコメント必須、誤記修正）に対する軽微な不整合。
- 最小修正案: ルールに沿ってヘッダーを追記・誤記修正する。
- 仕様確認: 不要。

---

## 6. mdと実装の矛盾

1. **AGENTS.md（264-266行目）「空カテゴリの一覧表示を抑制する」** と `ContainerWorks.tsx` / `WorksList.tsx` の実装が矛盾（→ R-06）。
2. **`docs/review/REVIEW_2026-09-08.md`** の「⏳ 再確認待ち」項目（問い合わせフォームの本番反映確認、ビルド成果物確認、現行URLとリダイレクト確認）が、今回のレビュー時点でも未解消のまま残っている。これは矛盾というより「前回レビューの残タスクが継続中」という状態。公開前にこの3項目のクローズが必要。
3. その他、`docs/BACKEND_HANDOFF.md` / `docs/WORKS_SPEC.md` の `works.json` 仕様と `src/types/works.ts`・実データの間に不整合は見つからなかった（型・必須項目・画像実在性ともに一致）。

---

## 7. SEO・公開設定の懸念

- canonical（`src/app/page.tsx:22`、`src/app/works/page.tsx:18`）、OGP（`src/app/layout.tsx:59-70`、`public/ogp.jpg` 実サイズ1200×630一致）、`robots.ts` / `sitemap.ts` の `force-static`（各4行目）、`NEXT_PUBLIC_IS_REAL_PROD` によるデモ/本番切替（`src/lib/env.ts`）はいずれも `docs/seo/SEO_SETUP.md` の方針通りに実装されており問題は見つからなかった。
- Twitter Card未実装（R-11、低）。
- `next.config.ts:3,16-18` の `isProd`（`assetPrefix` 分岐）は `NODE_ENV` ベースの判定であり、SEO切替に使う `NEXT_PUBLIC_IS_REAL_PROD` とは別軸。意図通りであれば問題ないが、両者の判定基準が異なる点は認識しておくべき（要確認、コード修正の指摘ではない）。

---

## 8. 確認したが問題が見つからなかった主要項目

- `npx tsc --noEmit`: エラー0件
- `npm run lint`（`eslint .`）: エラー・警告0件
- `next.config.ts`: `output: 'export'` / `trailingSlash: true` / `images.unoptimized` すべて設定済み
- Server Componentでの `fs`/`node:fs` 直読み: なし（全て `'use client'` + クライアントfetch）
- `public/db/works/works.json` 取得: `cache: 'no-store'` 付与済み、`res.ok` チェックあり、`catch` あり
- `works.json` の必須項目欠損、画像パスの `http://` 混入: なし
- `works.json` 内の全53画像パスが `public/db/works/images/` 配下に実在することを確認（過不足なし）
- 型定義 `src/types/works.ts` と実データの整合性
- 内部リンク（`Link href`）のリンク切れ: なし
- 外部リンクの `https://`/`tel:`/`mailto:` のみで Mixed Content なし
- XSS対策: `dangerouslySetInnerHTML` の使用は `SvgDefs.tsx` の静的SVG読み込みのみ（外部/ユーザー入力ではない）、`ContainerContact.tsx` はReact標準エスケープのみ
- `contact.php` のサーバー側検証（必須項目、`FILTER_VALIDATE_EMAIL`、ヘッダインジェクション対策）
- フォーム送信失敗時のエラーハンドリング（`try/catch`、`response.ok`、JSONパース失敗の3系統）
- APIキー等の秘密情報の露出: なし（R-07のメールアドレスコメントを除く）
- TSX↔SCSS Modulesのクラス名照合: 誤字・未定義参照なし
- 画像の `alt` 属性: 全箇所で意味のある文言が設定済み
- `button`/`a` の使い分け、`a`内`a`・`button`内`button`等の不正なネスト: なし（`logoTitle`重複を除きid重複もなし）
- `Modal.tsx` / `WorksModal.tsx` / `Header.tsx` のイベントリスナークリーンアップ: 主要箇所は問題なし（`Header.tsx:40`付近の`setTimeout`未クリアのみ軽微、実害はほぼ無いため今回は低優先度として個別項目化せず）

---

## 9. 要確認事項

| 項目 | 内容 |
|---|---|
| R-04 | タブレット縦・スマホ横での実際の表示崩れの有無（実機/DevTools確認が先） |
| R-05 | 施工事例モーダルの矢印ボタンのクリップ具合（実機/DevTools確認が先） |
| R-08 | 本番サーバー上の `/db` の実在・最新性（公開直前に必ず確認） |
| R-10 | h1を新設してよいか（デザイン・SEO方針の確認） |
| R-12 | Header/Footerのナビゲーション実装差異が意図的か |
| R-13 | `ScrollLink.tsx` を削除してよいか、今後使う予定があるか |
| R-14 | tel:/mailto:リンクの `target="_blank"` 挙動が意図的か |
| R-16 | `.box_btn` のリネームをしてよいか |
| データ | `works.json` の `new-construction` カテゴリ `id: "003"` で `thumbnail` が `images[0]` と異なる（`/db/works/images/new-construction/03/02.webp` vs `01.webp`）。バグではなく意図的なキュレーションの可能性があるため要確認 |
| データ | JSON取得失敗時・ロード中に専用のエラー/ローディングUIがなく `return null` で無表示になる仕様を許容するか |

---

## 10. 公開前に行う確認手順

1. 本番サーバー上の `/db`（`works.json` と画像一式）の実在・最新性を目視確認する（R-08）
2. ユーザー側で `npm run build:prod` を実行し、`out/backend/contact.php` の存在、`out/db` の不存在、`out/404.html`/`out/404` の不存在を確認する（`docs/review/REVIEW_2026-09-08.md` の残タスク）
3. 本番ドメインで問い合わせフォームのテスト送信・受信を確認する
4. スマホ横向き・iPad縦向き（768〜834px）でハンバーガーメニュー・施工事例モーダルの実機表示を確認する（R-04, R-05）
5. R-01対応後、問い合わせ完了/警告モーダル表示中にハンバーガーメニューが操作できないことを実機で確認する
6. スクリーンリーダー（VoiceOver等）でフォーム各項目・ロゴのアクセシブルネームの読み上げを確認する（R-02, R-03）
7. リダイレクト・`.htaccess` 周りの本番確認（`docs/review/REVIEW_2026-09-08.md` 記載の残項目）

---

## 11. 総評

TypeScript・ESLintはクリーンで、`output: 'export'` / `trailingSlash: true` / `images.unoptimized`、`public/db` のクライアントfetch方針、デモ/本番のSEO切替（`NEXT_PUBLIC_IS_REAL_PROD`）といった本プロジェクトの根幹ルールは仕様md通りに実装されており、公開を妨げる致命的な問題は見つからなかった。

一方で、①問い合わせ結果モーダルにスクロールロック・フォーカストラップがなく `aria-modal` の実態が伴っていない点（R-01）、②フォーム入力欄にlabel/aria-labelがない点（R-02）、③ロゴSVGのtitle idがトップページ内で3重複している点（R-03）は、いずれもアクセシビリティ上の実質的な不具合であり、既存の `WorksModal.tsx` 相当の実装に揃えるだけで解消できる小さな修正のため、公開前に対応することを推奨する。

レスポンシブのブレークポイント運用（`tbw`/`tb`/`spw` 未使用、R-04）と施工事例モーダルの矢印ボタン位置（R-05）は、コードだけでは崩れの有無を断定できないため、実機/DevToolsでの表示確認を先に行い、必要な箇所のみ最小修正することを推奨する。

AGENTS.md記載の「空カテゴリ表示抑制」（R-06）は現在のデータでは顕在化していないが仕様と実装が乖離しているため、次回のデータ更新前に修正しておくと安全。`contact.php` 内の個人メールアドレスのコメント（R-07）は公開前に削除しておきたい。

その他はいずれも低優先度・提案レベルの指摘であり、既存構成を尊重した最小修正で対応可能。

---

## 指摘一覧表

| ID | 重要度 | 対象ファイル | 問題 | 最小修正方針 | 仕様確認 |
|---|---|---|---|---|---|
| R-01 | 高 | src/components/Modal.tsx | 問い合わせ結果モーダルにスクロールロック・フォーカストラップがない | WorksModal.tsxと同様にbody.modal-open付与/解除を追加 | 不要 |
| R-02 | 高 | src/components/Top/ContainerContact.tsx:314-415 | フォーム入力欄にlabel/aria-labelがない | 各inputにid付与しdtをlabel htmlForに変更 | 不要 |
| R-03 | 高 | ContainerHero.tsx:29, ContainerAbout.tsx:18, Footer.tsx:15 | id="logoTitle"が3重複 | 各コンポーネントで一意なidに変更 | 不要 |
| R-04 | 中 | 全SCSS Modules / Header.module.scss:19-24 | tbw/tb/spwブレークポイント未使用、タブレット縦・スマホ横でレイアウト崩れの懸念 | 影響箇所のみspw/tbメディアクエリ追加 | 要確認 |
| R-05 | 中 | WorksModal.module.scss:22-26,56-59,177-190 | スマホ表示で矢印ボタンがクリップされる懸念 | sp時の矢印位置/overlay余白を調整 | 要確認 |
| R-06 | 中 | ContainerWorks.tsx:39-104, WorksList.tsx:44-54 | 空カテゴリの表示抑制が未実装（AGENTS.md矛盾） | items.length===0時にカテゴリブロックを非表示化 | 不要 |
| R-07 | 中 | public/backend/contact.php:104 | 個人メールアドレスのコメントが残存 | 該当コメント行を削除 | 不要 |
| R-08 | 中 | package.json:8-9 | 本番/db同期に依存する運用リスク（既存レビュー未解消） | 公開前に本番サーバー/dbの実在・最新性を目視確認 | 要確認 |
| R-09 | 中 | WorksModal.module.scss:213-216 | サムネイルhoverがタッチ端末でsticky hoverになる | &:hoverを@include hoverに変更 | 不要 |
| R-10 | 低 | 全ページ | h1がサイト全体に存在しない | ヒーロー領域にvisually-hidden h1を追加 | 要確認 |
| R-11 | 低 | src/app/layout.tsx:56-88 | Twitter Card未実装 | metadata.twitterを追加 | 不要 |
| R-12 | 低 | Header.tsx / Footer.tsx | ナビゲーション実装が不統一 | 提案のみ | 要確認 |
| R-13 | 低 | src/components/common/ScrollLink.tsx | 未使用コード | 削除候補（提案のみ） | 要確認 |
| R-14 | 低 | src/components/common/ExternalLink.tsx:7-11 | tel:/mailto:にもtarget="_blank"付与 | tel:/mailto:時はtarget省略する分岐追加 | 要確認 |
| R-15 | 低 | WorksModal.module.scss:142-144 | .splideArrowsが未使用（デッドコード） | 削除候補 | 不要 |
| R-16 | 低 | src/styles/PageTop.module.scss (611,627,674) | .box_btnのみ命名規則不統一 | 提案のみ | 要確認 |
| R-17 | 低 | 複数tsxファイル | TSXコメントヘッダー未記載・誤記 | ルールに沿って追記・修正 | 不要 |
</content>

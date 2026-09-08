## コーディング規約

### CSS方針

- Tailwind CSS は使用しない
- スタイルは SCSS で実装する
- モバイルファーストの新規実装では、文字サイズは `fs-fluid()` を優先する
- `fz()` は既存コード互換（レガシー）として扱い、新規では原則使わない

### リンク実装方針

- 生の `a` タグは使わない
- 内部遷移は `Link` を使う
- 外部遷移は `ExternalLink` を使う

### 画像実装方針

- TSX では生の `img` タグは原則使わず、`next/image` の `Image` を使う

### 改行データ方針

- 改行が必要な文言は文字列配列で管理し、1要素を1行として描画する
- 句読点（`、` `。`）を使った自動改行は行わない

### ファイル種別ごとの命名規則

| 対象 | 命名規則 | 例 |
|---|---|---|
| CSS Modules のクラス | キャメルケース | `.containerWorks`, `.itemImage` |
| SCSS変数 / ミックスイン | ケバブケース | `$primary-color`, `@mixin flex-center` |
| TS / TSX | キャメル/パスカル | `MyComponent`, `useState`, `handleClick` |

**理由**: CSS Modules は `styles.containerWorks` のように参照する既存実装へ合わせる。

### コンポーネントのクラス命名

- 親ラッパーはコンポーネント名ベースのキャメルケースに統一する
- 例: `ContainerWorks.tsx` は `styles.containerWorks`、SCSS側は `.containerWorks {}`
- 汎用的すぎる `root` / `wrapper` / `inner` だけの命名は避ける

# バックエンド / 管理画面引き渡しメモ

## このメモの役割

公開サイト側が `public/db` の JSON を読む前提で、管理画面・DB側に渡すべき仕様を整理する。

このプロジェクトでは、Next.js の静的書き出し後も DB 更新を即時反映したいため、公開サイト側はクライアントで JSON を取得する。

---

## 基本方針

- `public/db` は管理画面またはDB側が生成・更新する
- 公開サイト側は `fetch('/db/...')` で JSON を取得する
- 更新反映を優先する箇所では `cache: 'no-store'` を使う
- 必要に応じて `?t=${Date.now()}` を付けてブラウザキャッシュを回避する
- Server Component で `fs` を使って JSON を直接読まない
- JSONの内容更新のために Next.js の再ビルドを要求しない

---

## 現在の対象JSON

### 施工事例一覧

- ファイル: `public/db/works/works.json`
- 公開URL: `/db/works/works.json`
- 使用箇所:
  - トップページ施工事例セクション
  - 施工事例一覧ページ `/works/`

### 画像ディレクトリ

- `public/db/works/images/renovation/`
- `public/db/works/images/new-construction/`
- `public/db/works/images/store-office/`

---

## `works.json` の構造

```json
{
  "categories": [
    {
      "id": "renovation",
      "label": "RENOVATION",
      "labelJp": "リノベーション",
      "items": [
        {
          "id": "001",
          "location": "熊本市",
          "name": "Kビル :集合住宅",
          "thumbnail": "/db/works/images/renovation/01/01.webp",
          "images": [
            "/db/works/images/renovation/01/01.webp"
          ]
        }
      ]
    }
  ]
}
```

---

## カテゴリ仕様

現在のカテゴリ:

| id | label | labelJp |
|---|---|---|
| `renovation` | `RENOVATION` | `リノベーション` |
| `new-construction` | `NEW\nCONSTRUCTION` | `新築` |
| `store-office` | `STORE OFFICE` | `店舗・オフィス` |

注意:

- `id` はURLや画像パスと紐づくため、変更時は公開側の表示確認を行う
- `label` は表示用。改行が必要な場合は `\n` を使う
- `labelJp` は日本語表示用

---

## 施工事例アイテム仕様

各 item の必須項目:

- `id`: カテゴリ内の施工事例ID
- `name`: 施工事例名
- `thumbnail`: 一覧・カードで使う画像
- `images`: モーダルや詳細表示で使う画像配列

任意項目:

- `location`: 所在地

注意:

- `thumbnail` は `images` に含める
- `images` は空配列にしない
- 同一 item 内で画像パスを重複させない
- 画像パスは `/db/...` 始まりに統一する
- 画像ファイルは `public/db/works/images/...` に実在させる
- 日本語テキストは濁点分離などの文字揺れを避け、NFC正規化された文字を使う

---

## 公開側での扱い

- 表示順は JSON の配列順を正とする
- カテゴリIDや item ID の増減は、静的ページ数に依存しない
- 詳細を作る場合も、ID増減に強い固定ページ方式を優先する
- `/works/[id]/` のようなビルド時生成前提の導線は、DB更新と相性が悪いため正規導線にしない

---

## 管理画面側でチェックしたいこと

保存前チェック:

- JSONとして正しい形式か
- 必須項目が空でないか
- `thumbnail` が `images` に含まれているか
- `images` 内に重複がないか
- 参照画像ファイルが存在するか
- 画像パスが `http://` になっていないか
- 画像パスが `/db/works/images/` 配下になっているか

---

## SEO上の注意

- 施工事例の `name` / `location` は、検索に使われる可能性があるため表記ゆれを避ける
- 画像の内容と施工事例名が大きくズレないようにする
- 将来、施工事例ごとの詳細ページを作る場合は canonical / sitemap の扱いを先に決める
- JSON追加だけで新規URLを増やす設計にはしない

---

## 今後追加する場合の候補

- 施工種別の補足テキスト
- 竣工年
- 建物種別
- 施工エリア
- 一覧用の `alt`
- 表示 / 非表示フラグ

追加する場合は、公開側の型定義と表示条件を先に確認し、既存JSONを壊さない形で進める。

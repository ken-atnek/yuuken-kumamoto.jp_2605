# 施工事例 JSON構成仕様

## 目的

施工事例ページとトップページの施工事例セクションで使用する JSON 構成を定義する。

このプロジェクトでは、管理画面またはDB側が `public/db/works/works.json` を生成・更新し、公開サイト側はクライアントで取得して表示する。

---

## 対象ページ

- `/`
  - トップページ内の施工事例セクション
- `/works/`
  - 施工事例一覧ページ

---

## JSON配置

```text
public/
└─ db/
   └─ works/
      ├─ works.json
      └─ images/
         ├─ renovation/
         ├─ new-construction/
         └─ store-office/
```

公開URL:

```text
/db/works/works.json
```

---

## TypeScript型

型定義は `src/types/works.ts` を正とする。

```ts
export type WorkItem = {
  id: string;
  location?: string;
  name: string;
  thumbnail: string;
  images: string[];
};

export type WorkCategory = {
  id: string;
  label: string;
  labelJp: string;
  items: WorkItem[];
};

export type WorksData = {
  categories: WorkCategory[];
};
```

---

## JSON例

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
            "/db/works/images/renovation/01/01.webp",
            "/db/works/images/renovation/01/02.webp"
          ]
        }
      ]
    }
  ]
}
```

---

## カテゴリ

現在のカテゴリ:

| id | label | labelJp |
|---|---|---|
| `renovation` | `RENOVATION` | `リノベーション` |
| `new-construction` | `NEW\nCONSTRUCTION` | `新築` |
| `store-office` | `STORE OFFICE` | `店舗・オフィス` |

注意:

- `id` は画像パスや表示制御と紐づくため、変更時は公開側の表示確認を行う
- `label` は英字見出し用。改行が必要な場合は `\n` を使う
- `labelJp` は日本語見出し用
- 表示順は `categories` の配列順を正とする

---

## 施工事例 item

必須項目:

- `id`
- `name`
- `thumbnail`
- `images`

任意項目:

- `location`

注意:

- `id` はカテゴリ内で重複させない
- `thumbnail` は `images` に含める
- `images` は空配列にしない
- 同一 item 内で画像パスを重複させない
- 画像パスは `/db/works/images/` 始まりに統一する
- 外部URLや `http://` の画像パスは使わない
- 日本語テキストはNFC正規化し、濁点分離などの文字揺れを避ける

---

## 画像配置

画像ファイルは `public/db/works/images/...` に配置する。

例:

```text
public/db/works/images/renovation/01/01.webp
public/db/works/images/new-construction/03/12.webp
public/db/works/images/store-office/02/01.webp
```

JSONから参照する場合:

```json
"/db/works/images/renovation/01/01.webp"
```

---

## 取得方針

`output: 'export'` 運用のため、施工事例JSONはクライアントで取得する。

```ts
fetch('/db/works/works.json', { cache: 'no-store' })
```

Server Component で `fs` を使って直接読み込まない。

理由:

- ビルド時にJSON内容がHTMLへ焼き込まれるのを避ける
- 管理画面・DB側の更新を再ビルドなしで反映する

---

## ルーティング方針

現状、施工事例詳細はモーダル表示で扱う。

将来、詳細ページを追加する場合:

- ID増減に強い固定ページ方式を優先する
- 例: `/works/detail/?id=001`
- `/works/[id]/` のようなビルド時生成前提のURLは、DB更新運用と相性が悪いため正規導線にしない

---

## 管理画面側での保存前チェック

- JSONとして正しい形式か
- 必須項目が空でないか
- カテゴリ内で item ID が重複していないか
- `thumbnail` が `images` に含まれているか
- `images` 内に重複がないか
- 参照画像ファイルが存在するか
- 画像パスが `/db/works/images/` 配下になっているか
- 文字列に不要な濁点分離や表記ゆれがないか

---

## 今後の拡張候補

- 竣工年
- 建物種別
- 施工エリア
- 施工概要
- 一覧用 `alt`
- 表示 / 非表示フラグ
- 並び順 `sortOrder`

追加する場合は、既存JSONを壊さない形で型定義と表示条件を更新する。

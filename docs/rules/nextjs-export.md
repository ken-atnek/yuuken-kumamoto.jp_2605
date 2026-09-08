## Next.js 16 App Router の制約

### params は Promise型を使う（同期型は型エラーになる）

**Next.js 16 では `output: 'export'` であっても、`params` が Promise 扱いになる場合がある。**

ビルド時に静的生成されるため `await params` は問題なく動作する。

#### ✅ 正しい書き方（静的エクスポートでも同じ）

```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
}
```

#### ❌ NG（型エラーになる）

```typescript
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Type error: Promise のプロパティが不足
}
```

### generateMetadata / generateStaticParams

**不要に複雑化しない**

`async` 自体は禁止ではない。非同期処理が必要な場合は `async` を使ってよい。

#### 非同期処理がある場合

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  return { title: data.title };
}

export async function generateStaticParams() {
  const items = await getItems();
  return items.map((item) => ({ id: item.id }));
}
```

#### 非同期処理がない場合

```typescript
export function generateMetadata(): Metadata {
  return { title: "Page" };
}

export function generateStaticParams() {
  return [{ id: "1" }];
}
```

**方針**: 非同期処理がなければ `async` は付けない。`output: 'export'` 時はビルド時依存を増やしすぎず、必要な箇所だけで使う。

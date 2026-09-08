## データ取得パターン

`output: 'export'` のため、ランタイムのサーバーサイド処理は不可。
管理画面が `public/db/` 配下の JSON を書き換えるため、全データ取得はクライアントサイドで行う。

### `force-dynamic` は使用禁止

```typescript
// ❌ NG: output: 'export' と競合してビルドエラーになる
export const dynamic = "force-dynamic";
```

### 施工事例JSON

```typescript
const [data, setData] = useState<WorksData | null>(null);
const [isError, setIsError] = useState(false);

useEffect(() => {
  fetch('/db/works/works.json', { cache: 'no-store' })
    .then((res) => {
      if (!res.ok) throw new Error('fetch failed');
      return res.json();
    })
    .then((json: WorksData) => setData(json))
    .catch(() => setIsError(true));
}, []);
```

**理由**: `cache: 'no-store'` でキャッシュを抑制し、管理画面・DB側の更新を反映しやすくする。

必要に応じて、より強くキャッシュを避けたい箇所では `?t=${Date.now()}` を付ける。

### 型定義

施工事例JSONの型定義は `src/types/works.ts` を正とする。

### エラー表示

現状の `WorksList` は読み込み失敗時の表示を持っていない。必要になった場合は、`isError` state を追加して「データの読み込みに失敗しました。」などの最小表示を入れる。

# 匿名台灣 (Anonymous Taiwan)

匿名投稿 → 透過 Zernio 同時發布到 **Threads** 與 **Instagram**（相同內容）。

- 標題固定為「匿名台灣」
- 內文為使用者投稿內容
- 不使用資料庫、不使用 Canva

## 環境變數（Vercel）

| 變數 | 必填 | 說明 |
|------|------|------|
| `ZERNIO_API_KEY` | 是 | Zernio API Key |
| `ZERNIO_ACCOUNT_IDS` | 是 | `threads:帳號ID,instagram:帳號ID` |

帳號 ID 可在 Zernio Dashboard 或 `zernio accounts:list` 取得。

## 本機

```bash
npm install
cp .env.example .env.local
npm run dev
```

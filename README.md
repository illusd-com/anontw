# 匿名台灣 (Anonymous Taiwan)

匿名投稿平台。投稿內容透過 **Zernio** 自動發布至社群平台，並可選擇以 **Canva** Autofill 自動匯入文字產生設計。

- 不使用資料庫
- 投稿內容不在本站持久化儲存
- 部署於 Vercel

## 技術

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Zernio API（多平台社群發布）
- Canva Connect API（Autofill 文字匯入）

## 環境變數

在 Vercel 專案設定以下變數（Production / Preview）：

| 變數 | 必填 | 說明 |
|------|------|------|
| `ZERNIO_API_KEY` | 是 | Zernio API Key（`sk_...`） |
| `ZERNIO_ACCOUNT_IDS` | 是 | 帳號清單，格式：`platform:accountId,platform:accountId`，例如 `twitter:acc_xxx,instagram:acc_yyy` |
| `CANVA_ACCESS_TOKEN` | 否 | Canva OAuth Access Token（啟用 Canva 選項時需要） |
| `CANVA_BRAND_TEMPLATE_ID` | 否 | 已標記 `TITLE`、`BODY` 文字欄位的 Brand Template ID |

取得 Zernio 帳號 ID：使用 Zernio Dashboard 或 `zernio accounts:list`。

Canva Brand Template：在 Canva 建立模板，用 Bulk Create / Data autofill 標記文字欄位名稱為 `TITLE` 與 `BODY`，再發布為 Brand Template。

## 本機開發

```bash
npm install
cp .env.example .env.local   # 填入實際金鑰
npm run dev
```

## 部署

推送到 `main` 後，Vercel 會自動建置。請確認環境變數已在 Vercel 專案中設定。

## 授權

Private.

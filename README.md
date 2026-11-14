# 東蜂科技官網（www.cerana.tech）

Next.js 靜態站（`output: 'export'`），部署在 Cloudflare Pages（Cerana 帳號，專案 `cerana-website`）。2026-11 起不再依賴 Notion：所有文案、案例、方案、團隊都在 `lib/content.ts`，改內容就改那個檔案再 push。

```bash
pnpm install
pnpm build   # 產出 out/
pnpm start   # 用 serve 看 out/
```

- 案例只標示產業、不寫客戶名稱。
- 舊 NotionNext 網址（`/article/*`、`/archive`）在 `public/_redirects` 轉址到 `/cases`。
- 聯絡表單 POST 到 n8n webhook（`site.contactWebhook`），失敗時改為開信件草稿到 `site.email`。

## 部署

```bash
pnpm build
CLOUDFLARE_ACCOUNT_ID=4e5aed3170d1911c291ec48ed2d1f383 wrangler pages deploy out --project-name cerana-website --branch main
```

網域 www.cerana.tech、cerana.tech 掛在 Pages 專案的 Custom domains，DNS 在 Cloudflare（Cerana 帳號）的 cerana.tech zone。

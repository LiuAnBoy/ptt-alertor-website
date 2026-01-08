# PTT Alertor Dashboard

PTT 文章訂閱通知服務前端 Dashboard，使用 Next.js 開發。

## 功能

- 用戶註冊/登入
- 訂閱管理 (關鍵字、作者、推文數)
- Telegram 帳號綁定
- 熱門訂閱排行榜
- 管理員後台

## 技術架構

- **Next.js 16** - React 框架
- **TypeScript** - 型別安全
- **Material UI** - UI 元件庫
- **React Query** - 資料請求快取
- **NextAuth.js** - 認證

## 開發環境

### 需求

- Node.js 20+
- pnpm

### 安裝

```bash
# 安裝相依套件
pnpm install

# 建立環境變數
cp .env.example .env.local
```

### 啟動

```bash
# 開發模式
pnpm dev

# 或
npm run dev
```

### 服務位址

| 服務 | URL |
|------|-----|
| Dashboard | http://localhost:3000 |

## 環境變數

```bash
# API endpoint
NEXT_PUBLIC_API_URL=http://localhost:9090

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Telegram Bot (for bind URL)
TELEGRAM_BOT_USERNAME=your_bot_username
```

### Vercel 部署環境變數

| 變數 | 說明 |
|------|------|
| `NEXT_PUBLIC_API_URL` | 後端 API URL |
| `NEXTAUTH_URL` | 前端 URL (Vercel 自動設定) |
| `NEXTAUTH_SECRET` | NextAuth 密鑰 |
| `TELEGRAM_BOT_USERNAME` | Telegram Bot Username |

## 專案結構

```
dashboard/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── user/             # 用戶認證頁面 (login, register)
│   │   ├── settings/         # 設定頁面
│   │   ├── top/              # 熱門訂閱排行
│   │   └── api/              # API Routes
│   ├── providers/            # React Context Providers
│   ├── services/             # API 服務與 React Query Hooks
│   ├── shared/               # 共用元件
│   │   ├── components/       # UI 元件
│   │   ├── forms/            # 表單元件
│   │   └── layouts/          # 版面配置
│   ├── stores/               # Zustand 狀態管理
│   ├── styles/               # 主題樣式
│   └── types/                # TypeScript 型別
├── public/                   # 靜態資源
└── ...
```

## 頁面路由

| 路徑 | 說明 |
|------|------|
| `/` | 首頁 (使用說明) |
| `/user/login` | 登入 |
| `/user/register` | 註冊 |
| `/settings` | 設定 (訂閱管理、綁定管理) |
| `/top` | 熱門訂閱排行 |

## 部署到 Vercel

### 方法 1: Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方法 2: GitHub 連接

1. 將專案推送到 GitHub
2. 在 Vercel Dashboard 連接 GitHub repo
3. 設定環境變數
4. 自動部署

### Build 設定

Vercel 會自動偵測 Next.js 專案，使用預設設定：

- Build Command: `pnpm build` 或 `npm run build`
- Output Directory: `.next`
- Install Command: `pnpm install` 或 `npm install`

## 開發指令

```bash
# 開發
pnpm dev

# Build
pnpm build

# 啟動 production
pnpm start

# Lint
pnpm lint
```

## License

Apache License 2.0

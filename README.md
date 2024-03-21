# 雙重驗證註冊系統
這是一個帶有雙重驗證功能的註冊系統，用戶註冊時需要通過電子郵件驗證碼進行身份驗證。

## 功能

- 使用者註冊時需要提供有效的電子郵件地址，系統會向該郵箱發送驗證碼以進行驗證。
- 使用者在登入後需要進行兩步驟驗證，通常是使用驗證應用程式生成的動態驗證碼。
- 使用者可以選擇使用第三方社交平台（如 Google、Github）進行註冊和登入。

## 技術堆疊

這個專案使用了下列技術：

### 開發框架和工具

- [Next.js](https://nextjs.org/) - 基於 React 的前端框架，用於構建客戶端應用程式。
- [Prisma](https://www.prisma.io/) 作為數據庫 ORM，用於操作數據庫。
- [Tailwind CSS](https://tailwindcss.com/) - 一個高度可定制的 CSS 框架，用於設計界面和佈局。

### 前端庫和組件

- [React](https://reactjs.org/) - JavaScript 库，用於構建用戶界面。
- [React Hook Form](https://react-hook-form.com/) - React 表單庫，用於處理表單輸入和驗證。
- [React Icons](https://react-icons.github.io/react-icons/) - React 圖標庫，提供常用圖標的組件。
- [React Spinners](https://www.npmjs.com/package/react-spinners) - React 組件庫，提供各種加載指示器的組件。
- [Shadcn UI](https://ui.shadcn.com/) 提供可重用的 UI 元件
- [Tailwind CSS](https://tailwindcss.com/) - 用於快速構建用戶界面的 CSS 框架，使用原子級的 CSS 類名定義界面風格和樣式。

### 其他工具和庫

- [NextAuth.js](https://next-auth.js.org/) - 用於管理身份驗證的庫，支持社交登入和多種驗證策略。
- [Nodemailer](https://nodemailer.com/about/) - Node.js 的郵件發送庫，用於發送郵件。
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first 的驗證庫，用於驗證數據結構。

### 開發工具

- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，用於增強靜態類型檢查功能。
- [ESLint](https://eslint.org/) - JavaScript 和 TypeScript 的靜態代碼分析工具，用於檢查代碼風格和發現錯誤。
- [Prettier](https://prettier.io/) - 代碼格式化工具，用於自動格式化代碼風格。
- [Nodemailer](https://nodemailer.com/) 進行郵件發送
- [UUID](https://www.npmjs.com/package/uuid) 用於生成唯一標識符
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) 進行密碼加密和驗證


## 開發中遇到的難題

### 技術問題：
使用最新版本 NextJS 框架時，在 Auth.js 串接 Google Provider的過程，設置錯誤的回調無法正確導向指定的路由，導致卡關。

### 問題描述： 
在此專案中，我使用最新版本的 NextJS 架設網站，並使用 Auth.js 來實現身份驗證，並使用 Google 提供的憑證進行註冊及登入。然而，在設置錯誤的回調時，無法正確導向指定的路由，這導致應用程式無法正常運行。

### 解決方法： 
在最新版本的 NextJS 中，尚未修復此問題，因此我們暫時無法通過升級 NextJS 解決這個問題。但可以在中間件中進行處理暫時解決這個問題，以保持應用的正常運行。

### 暫時的解決方法：
`./middleware.ts`
```javascript=
const { nextUrl } = req;

const errorPath = nextUrl.pathname.includes('/api/auth/auth/login');
if (errorPath) {
  return Response.redirect(new URL("/auth/login?error=OAuthAccountNotLinked", nextUrl));
}
```
在這段代碼中，檢查了請求的路徑是否包含 `/api/auth/auth/login`，這是設置錯誤的回調時可能發生的情況。如果是，則將請求重定向到指定的錯誤路由 `/auth/login?error=OAuthAccountNotLinked`。

### 未來規劃： 
雖然目前可以使應用程式運行，但仍然希望在未來使用最新版本的 NextJS。將繼續關注 NextJS 的更新，並在修復此問題後盡快升級到最新版本。

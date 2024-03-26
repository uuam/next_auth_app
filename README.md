# 雙重驗證註冊系統練習

此項目是關於註冊系統及雙重驗證流程的練習應用程式。
通過跟著[教學影片-Next Auth V5](https://www.youtube.com/watch?v=1MTyCvS05V4)學習最新版本的Auth.js，進一步理解身份驗證（Auth）的應用，並且對於 React 的架構設計和 Prisma 運作也有了更清晰的認知。

## 最近更新

- **日期:** 2024-03-26
- **內容:** 整合 Vercel 的 Web Analytics 功能，以追蹤用戶行為和網站表現。

- **日期:** 2024-03-23
- **內容:** 
  - 新增了針對手機頁面的響應式設計，提升用戶在手機上的瀏覽體驗。
  - 添加 metadata 網站標題、描述、關鍵字等，增加用戶體驗。
  - 新增 Navbar載入其他分頁時的 Loading 動畫。


## 功能

- 使用者註冊時需要提供有效的電子郵件地址，系統會向該郵箱發送驗證碼以進行驗證。
- 使用者在登入後需要進行兩步驟驗證，通常是使用驗證應用程式生成的動態驗證碼。
- 使用者可以選擇使用第三方社交平台（如 Google、Github）進行註冊和登入。

## 技術堆疊

這個專案使用了下列技術：

### 開發框架和工具

- [Next.js](https://nextjs.org/) - 基於 React 的前端框架，用於構建客戶端應用程式。
- [Prisma](https://www.prisma.io/) 作為資料庫 ORM，用於操作資料庫。
- [Tailwind CSS](https://tailwindcss.com/) - 一個高度可定制的 CSS 框架，用於設計界面和佈局。

### 前端庫和組件

- [React](https://reactjs.org/) - 用於構建用戶界面。
- [React Hook Form](https://react-hook-form.com/) - 用於處理表單輸入和驗證。
- [React Icons](https://react-icons.github.io/react-icons/) - 提供常用圖標的組件。
- [React Spinners](https://www.npmjs.com/package/react-spinners) - 提供各種 Loading Components 的組件。
- [Shadcn UI](https://ui.shadcn.com/) 提供可重用的 UI 元件
- [Tailwind CSS](https://tailwindcss.com/) - 用於快速構建界面的 CSS 框架，使用原子級的 CSS 類名定義風格和樣式。

### 其他工具和庫

- [NextAuth.js](https://next-auth.js.org/) - 用於管理身份驗證的庫，支持社交登入和多種驗證策略。
- [Nodemailer](https://nodemailer.com/about/) - Node.js 的郵件發送庫，用於發送郵件。
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first 的驗證庫，用於驗證數據結構。

### 開發工具

- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，用於增強靜態類型檢查功能。
- [ESLint](https://eslint.org/) - JavaScript 和 TypeScript 的靜態代碼分析工具，用於檢查代碼風格和發現錯誤。
- [Prettier](https://prettier.io/) - 代碼格式化工具，用於自動格式化代碼風格。
- [Nodemailer](https://nodemailer.com/) 進行郵件發送
- [UUID](https://www.npmjs.com/package/uuid) 用於生成唯一標示碼
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


## 學習收穫
在完成這個項目的過程中，我獲得了以下收穫：

1. Auth 應用瞭解: 通過實際操作和開發，更深入地理解了身份驗證系統的工作原理，包括使用 Auth.js 來管理身份驗證、支持多種驗證策略以及處理身份驗證錯誤。

2. React 架構設計: 透過構建註冊系統，我對 React 框架中的組件化設計、狀態管理和路由導航等方面有了更深入的了解，掌握如何設計清晰、易於維護的 React 應用程式，以及學會利用其內置的路由和預渲染功能來優化應用性能，這對於構建大型的前端應用程式將會有很大的幫助。

3. Prisma 應用實踐: 通過與 Prisma 整合，學習如何使用 Prisma 來管理和操作數據庫，包括定義模型、生成 CRUD 操作等，使應用程式有效地儲存和用戶索引數據。

4. Nodemailer 的應用: 在這個項目中，我開始使用 Nodemailer 來處理郵件發送的相關功能，這為應用程式的通知和電子郵件驗證等功能提供了便利。


## 下一步計劃
在完成了這個練習應用程式之後，我打算開始求職生涯：

* 求職：在這段學習中，我認為我已具備一名 Fornt-End-Developer的技能，能面對更多的挑戰。

* 持續學習: 積極跟進最新的前端技術和最佳實踐，不斷學習和探索新的技術領域。

這個項目對我在前端開發和身份驗證系統方面的理解和技能提升都有很大的幫助，期待著將這些知識應用到更多的開發項目。

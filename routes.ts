/**
 * An array of routes that are accessible to the public
 * 可公開訪問的路由陣列
 * These routes do not require authentication
 * 這些路由不需要身份驗證
 * 這些路由是公開訪問的，不需要身份驗證即可訪問
 *  @type {string[]}
 */
export const publicRoutes = ["/"];
/**
 * An array of routes that are used for authentication
 * 用於身份驗證的路由陣列
 * These routes will redirect logged in users to /settings
 * 這些路由將重定向已登錄的使用者到 /settings
 * 這些路由需要用戶身份驗證。如果用戶未登錄，訪問這些路由將被重定向到登錄頁面。如果用戶已經登錄，則將被重定向到預設的登錄後重定向路徑
 *  @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API authentication routes
 * API 身份驗證路由的前綴
 * Routes that start with this prefix are used for API authentication purposes
 * 以此前綴開頭的路由用於 API 身份驗證目的
 * 這個前綴指示API身份驗證路由的起始位置。通常，這些路由用於處理需要身份驗證的API請求。
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after loggged in
 * 登錄後的默認重定向路徑
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

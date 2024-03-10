import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const errorPath = nextUrl.pathname.includes('/api/auth/auth/login')
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(errorPath){
    return Response.redirect(new URL("/auth/login?error=OAuthAccountNotLinked", nextUrl));
  }

  // 用於 api請求的路由不需額外驗
  if (isApiAuthRoute) {
    return null;
  }

  // 登入和註冊頁面通常被列為需要進行身份驗證的路徑，以確保只有未登入的用戶才能訪問它們。這樣可以防止已經登入的用戶再次訪問這些頁面。
  // 如果是需要身份驗證的路徑
  if (isAuthRoute) {
    // 且用戶已登錄
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  // 如果用戶未登錄且訪問的路徑不在公開路徑中
  if (!isLoggedIn && !isPublicRoute) {
    // return Response.redirect(new URL("/auth/login", nextUrl));
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // 用於指定哪些路由或路徑應該應用這個中介軟體
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ["/auth/login"],
};

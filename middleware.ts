import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
 
export default auth((req) => {
  // !! 確保值為boolean
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: ", req.nextUrl.pathname);
  console.log("IS LOGGEDIN: ", isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // 用於指定哪些路由或路徑應該應用這個中介軟體
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ["/auth/login"],
};

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // pages: 不使用NextAuth提供的，指定自己創建的
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // events: 用於定義身份驗證期間可能發生的各種事件的處理程序。這些事件可以包括用戶成功登錄、登出、訪問受保護的路由等。
  events: {
    // linkAccount 是當用戶成功將外部帳戶連結到現有帳戶時觸發，當使用者是本地帳戶時，linkAccount事件不會被觸發
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  // callbacks回調函數會在NextAuth驗證身份時被調用
  callbacks: {
    // async signIn({ user }) {
    //   if (!user || !user.id) {
    //     return false;
    //   }
    //   const existingUser = await getUserById(user.id);
    //   if (!existingUser || !existingUser.emailVerified) return false ;
    //   return true;
    // },
    async signIn({ user, account }) {
      // Allow OAuth without email verification 允許 OAuth 不需信箱驗證
      if (account?.provider !== "credentials") return true;
      // @ts-ignore
      const existingUser = await getUserById(user.id);
      // Prevent sign in wuthout email verification
      if (!existingUser?.emailVerified) return false;
      // TODO: Add 2FA check
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});

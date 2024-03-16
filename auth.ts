import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/account";

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
      console.log("signIn:", { user, account });
      // Allow OAuth without email verification 允許 OAuth 不需信箱驗證
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id!);
      // Prevent sign in wuthout email verification
      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;
        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { userId: twoFactorConfirmation.userId },
        });
      }
      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (token.role) session.user.role = token.role as UserRole;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        if (token.email) session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      if (token) {
        token.isOAuth = !!existingAccount;
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.role = existingUser.role;
        token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});

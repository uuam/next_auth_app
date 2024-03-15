import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: Boolean;
};

擴展已經存在的模組的類型定義;
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     role: "ADMIN" | "USER";
//   }
// }

declare module "@auth/core/adapters" {
  interface AdapterUser {
    password: string;
    role: "ADMIN" | "USER";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: "ADMIN" | "USER";
  }
}

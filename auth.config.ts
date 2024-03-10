import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"


import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";


export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          // !user.password 可能會發生在使用github/google註冊登錄
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return null;
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
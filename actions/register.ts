"use server";

import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "../data/user";
import { db } from "../lib/db";
import { RegisterSchema } from "../schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";
// import { sendVerificationEmail } from "@/lib/mail";
import { sendVerificationEmail } from "@/lib/email";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.parse(values);
  if (!validatedFields) return { error: "出了點問題!" };

  const { email, password, name } = validatedFields;
  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "用戶已存在!" };
  await db.user.create({
    data: {
      email,
      password: hashPassword,
      name,
    },
  });
  const verificationToken = await generateVerificationToken(email);

  // TODO: 發送驗證 token 電子郵件， token: 身份驗證或授權信息
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "驗證信已寄出!" };
};

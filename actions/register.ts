"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.parse(values);
  if (!validatedFields) return { error: "Something went!" };

  const { email, password, name } = validatedFields;
  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "User already exists!" };
  await db.user.create({
    data: {
      email,
      password: hashPassword,
      name,
    },
  });
  // TODO: 發送驗證 token 電子郵件， token: 身份驗證或授權信息

  return { success: "User created!" };
};

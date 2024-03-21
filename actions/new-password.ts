"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "缺少 token" };
  const vaildatedFields = await NewPasswordSchema.parseAsync(values);

  if (!vaildatedFields) return { error: "無效欄位!" };

  const { password } = vaildatedFields;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: "錯誤的 token" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "token 已過期!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "此信箱不存在!" };
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return {success: '密碼已更新'}
};

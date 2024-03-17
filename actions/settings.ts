"use server";

import bcryct from "bcryptjs";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { unstable_update } from "@/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  // 透過第三方服務提供商管理用戶的身份和訪問權限
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  // 修改 email
  if (values.email && values.email !== user.email) {
    // 確認 輸入的 email是否已經註冊過
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }
    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Vrtification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordIsMatch = await bcryct.compare(
      values.password,
      dbUser.password
    );
    if (!passwordIsMatch) {
      return { error: "Password is incorrect!" };
    }
    const hashedPassword = await bcryct.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updateUser = await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  unstable_update({
    user: {
      name: updateUser.name,
      email: updateUser.email,
      role: updateUser.role,
      isTwoFactorEnabled: updateUser.isTwoFactorEnabled,
    },
  });

  return { success: "Settings Updated!" };
};

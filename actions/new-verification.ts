"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationByToken(token);
  if (!existingToken) return { error: "驗證碼不存在!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "驗證碼已過期!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "信箱不存在!" };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  setTimeout(async () => {
    await db.verificationToken.delete({
      where: { id: existingToken.id, token: existingToken.token },
    });
  }, 1000);

  return { success: "電子郵件已驗證!", email: existingToken.email };
};

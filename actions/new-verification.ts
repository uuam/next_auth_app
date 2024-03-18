"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationByToken(token);
  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email does not exist!" };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  setTimeout(async () => {
    await db.verificationToken.delete({
      where: { id: existingToken.id, token: existingToken.token },
    });
  }, 1000);

  return { success: "Email verified!", email: existingToken.email };
};

"use server";

import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "無效的電子信箱!",
    };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "此信箱不存在!",
    };
  }

  // TODO: generate token & send email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "重設密碼驗證信已寄出!" };
};

"use server"; // actions is all server side
import { getUserByEmail } from "@/data/user";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { LoginSchema } from "../schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
// import { sendVerificationEmail } from "@/lib/mail";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/email";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);
  // safeParse() 會返回一個 ZodParsedType

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validatedFields.data;

  // 確認使用者是否已存在
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesn't exist!" };
  }
  // 如果信箱還沒有驗證，則再寄一封認證信
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }

  // 雙重驗證系統
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "Invalid code!" };
      if (twoFactorToken.token !== code) return { error: "Invalid code!" };
      const hasExpired = new Date(twoFactorToken?.expires) < new Date();

      if (hasExpired) {
        await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id, token: twoFactorToken.token },
        });
        return { error: "Code has expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id, token: twoFactorToken.token },
      });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { userId: existingConfirmation.userId },
        });
      }
      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const hasTwoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );
      if (hasTwoFactorToken) return { twoFactor: true };

      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      console.log(twoFactorToken.token);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  return { success: "Email sent!" };
};

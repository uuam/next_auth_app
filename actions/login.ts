"use server"; // actions is all server side
import { getUserByEmail } from "@/data/user";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { LoginSchema } from "../schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  // safeParse() 會返回一個 ZodParsedType

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

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

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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

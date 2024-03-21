import { UserRole } from "@prisma/client";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "密碼至少需要 6 個字元" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "請輸入電子信箱" }),
  password: z.string().min(6, { message: "密碼至少需要 6 個字元" }),
  code: z.optional(z.string()),
});
// message: 錯誤警告內容

export const ResetSchema = z.object({
  email: z.string().email({ message: "請輸入電子信箱" }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "密碼至少需要 6 個字元" }),
  name: z.string().min(2, { message: "請輸入用戶名稱" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  // refine 方法用於對已定義的 schema 進行進一步的細化或驗證
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: "New password is required!", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      return true;
    },
    { message: "請輸入密碼", path: ["password"] }
  );

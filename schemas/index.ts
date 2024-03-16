import { UserRole } from "@prisma/client";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "minimum 6 characters required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6),
  code: z.optional(z.string()),
});
// message: 錯誤警告內容

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(2, { message: "Name is required" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabeled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
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
    { message: "Password is required!", path: ["password"] }
  );

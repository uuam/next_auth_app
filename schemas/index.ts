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

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
});

"use server"; // actions is all server side
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async(values: z.infer<typeof LoginSchema>) => {
  // 驗證字段
  const validatedFields = LoginSchema.safeParse(values);
  // safeParse() 會返回一個 ZodParsedType

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};

"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    return { success: "允許的伺服器操作!" };
  }
  return { error: "禁止的伺服器操作!" };
};

// 在 sever side page 使用

import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return  session?.user ;
  // try {
  //   const session = await auth();
  //   return session?.user;
  // } catch (error) {
  //   console.error("Error fetching current user:", error);
  //   // 可以選擇回傳一個預設的使用者物件或者是 null
  //   return null;
  // }
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

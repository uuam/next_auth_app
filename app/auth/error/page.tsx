import { ErrorCard } from "@/components/auth/error-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "錯誤頁面",
  description: "糟糕...發生錯誤",
};

const AuthErrorPage = () => {
  return <ErrorCard />;
};

export default AuthErrorPage;

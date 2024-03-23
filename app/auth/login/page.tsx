import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "登入",
  description: "登入 2FA 驗證網頁",
};

const LoginPage = () => {
  return <LoginForm />;
};
export default LoginPage;

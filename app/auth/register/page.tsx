import { auth } from "@/auth";
import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: '註冊',
  description:"註冊一個帳號吧！"
}

const RegisterPage = async () => {
  const user = await auth();
  if(user) redirect('/')
  return <RegisterForm />;
};
export default RegisterPage;

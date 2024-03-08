import { auth } from "@/auth";
import { RegisterForm } from "@/components/auth/register-form";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const user = await auth();
  if(user) redirect('/')
  return <RegisterForm />;
};
export default RegisterPage;

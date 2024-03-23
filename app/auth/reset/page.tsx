import { ResetForm } from "@/components/auth/reset-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: '忘記密碼',
    description:"發送電子郵件驗證"
  }
  

const ResetPage = () => {
    return(
       <ResetForm />
    )
};
export default ResetPage;

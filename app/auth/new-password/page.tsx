import { NewPasswordForm } from "@/components/auth/new-passoword-form";
import { Metadata } from "next";

export const metadata:Metadata ={
    title:"重設密碼",
    description:"設定新密碼"
}


const NewPasswordPage = ()=>{
    return(
        <NewPasswordForm />
    ) 
}
export default NewPasswordPage;
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { LoginButton } from "@/components/auth/login-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "首頁 | 2FA",
  description:"帳號雙重驗證(2FA)網頁首頁"
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main
      className={cn(
        "flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
      )}
    >
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            poppins.className
          )}
        >
          🔐 AUTH
        </h1>
        <p className="text-white text-lg">簡易的身份驗證服務</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              登入
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}

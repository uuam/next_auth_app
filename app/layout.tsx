import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | 2FA",
    absolute: "Next Auth | 2FA",
  },
  verification: {
    // google:'5Xy4AgCm0ktuVq6l8VME36ZvjQ9rT2eSOUISypaXV3A',
    google:'aVUBlVSKtubvf21M-vKyrwh_n1GvbTUFnU9KtTWUqc8'

  },
  description:
    "使用 Auth.js 進行用戶驗證，Next.js 框架搭建的簡易響應式網頁｜簡易的雙重驗證網頁，具有註冊登入等功能，也可使用社交媒體帳號登入｜Google | Github",
  icons: "favicon.ico",
  keywords: ["NextJS", "Auth", "2PA", "雙重驗證系統", "註冊", "登入"],
  openGraph: {
    title: { template: "%s | 2FA", absolute: "Next Auth | 2FA" },
    description:
      "簡易的雙重驗證網頁，具有註冊登入等功能，也可使用社交媒體帳號登入",
    type: "website",
    images: "https://next-auth-2fa.vercel.app/org_img.png",
    siteName: "Next Auth 2FA | Auth 雙重驗證",
    locale: "zh_TW",
    url:"https://next-auth-2fa.vercel.app/"
  },
  generator: "Next.js",
  applicationName: "簡易雙重驗證",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn(inter.className, " tracking-wider")}>
          <Toaster />
          {children}
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}

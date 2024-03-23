"use client";

import { Navbar } from "@/app/(protected)/_components/navbar";

import { createContext, useEffect, useState } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

function getWindowDimensions() {
  const { innerWidth } = window;
  return innerWidth;
}

export const MyContext = createContext<boolean>(false);

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  "use client";
  const [screenWidth, setScreenWidth] = useState<number>(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isMobile = screenWidth < 640;

  return (
    <div className="flex-col-reverse flex sm:gap-y-10 items-center justify-normal mt-4 sm:py-4 sm:min-h-full w-full sm:mt-0 sm:flex-col sm:justify-center sm:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Navbar isMobile={isMobile} />
      <MyContext.Provider value={isMobile}>{children}</MyContext.Provider>
    </div>
  );
};

export default ProtectedLayout;

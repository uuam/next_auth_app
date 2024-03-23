"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartBar, FaDesktop } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { useState, useTransition } from "react";
import { BeatLoader, DotLoader } from "react-spinners";

export const Navbar = ({ isMobile }: { isMobile: boolean }) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleItemClick = () => {
    setIsTransitioning(true);
    startTransition(() => {
      setIsTransitioning(false); // 過渡完成後取消過渡狀態
    });
  };

  return (
    <>
      {isPending ? (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-slate-950 bg-opacity-15 flex justify-center items-center">
          <BeatLoader size={16}/>
        </div>
      ) : (
        ""
      )}
      <nav className="z-0 w-screen justify-evenly px-2 py-6 bg-secondary flex sm:justify-between sm:items-center sm:p-4 sm:rounded-xl sm:w-[600px] shadow-sm">
        <div className="flex gap-x-2">
          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
            onClick={handleItemClick}
            disabled={isPending}
          >
            <Link href="/server">
              {isMobile ? <FaChartBar size={24} /> : "Server"}
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/client" ? "default" : "outline"}
            onClick={handleItemClick}
            disabled={isPending}
          >
            <Link href="/client">
              {isMobile ? <FaDesktop size={24} /> : "Client"}
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
            onClick={handleItemClick}
            disabled={isPending}
          >
            <Link href="/admin">
              {isMobile ? <MdAdminPanelSettings size={28} /> : "Admin"}
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
            onClick={handleItemClick}
            disabled={isPending}
          >
            <Link href="/settings">
              {isMobile ? <FaUserGear size={24} /> : "Settings"}
            </Link>
          </Button>
        </div>
        <UserButton isMobile={isMobile} />
      </nav>
    </>
  );
};

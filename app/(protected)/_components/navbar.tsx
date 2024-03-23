"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartBar, FaDesktop } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";

export const Navbar = ({isMobile}: {isMobile:boolean}) => {
  const pathname = usePathname();
  return (
    <nav className="w-screen justify-evenly px-2 py-6 bg-secondary flex sm:justify-between sm:items-center sm:p-4 sm:rounded-xl sm:w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">
            {isMobile ? <FaChartBar size={24} /> : "Server"}
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">
            {isMobile ? <FaDesktop size={24} /> : "Client"}
          </Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">
            {isMobile ? <MdAdminPanelSettings size={28} /> : "Admin"}
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">
            {isMobile ? <FaUserGear size={24} /> : "Settings"}
          </Link>
        </Button>
      </div>
      <UserButton isMobile={isMobile} />
    </nav>
  );
};

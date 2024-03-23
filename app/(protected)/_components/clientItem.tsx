"use client";
import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";


const ClientPageItem = () => {
  const user = useCurrentUser();

  return <UserInfo label="📱 客戶端組件" user={user} />;
};

export default ClientPageItem;

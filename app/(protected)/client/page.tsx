"use client";
import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMemo } from "react";

const ClientPage = () => {
  const user = useCurrentUser();

  // return <UserInfo label="📱Client component" user={user} />;
  const memoizedUserInfo = useMemo(() => {
    return <UserInfo label="📱 Client component" user={user} />;
  }, [user]);

  return memoizedUserInfo;
};

export default ClientPage;

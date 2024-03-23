import { ExtendedUser } from "@/types/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-screen h-full rounded-none border-none sm:border  sm:rounded-lg sm:h-auto sm:w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-sm max-w-[180px] rounded-md p-1 bg-slate-100 font-mono">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">用戶名稱</p>
          <p className="truncate text-sm max-w-[180px] rounded-md p-1 bg-slate-100 font-mono">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">電子信箱</p>
          <p className="truncate text-sm max-w-[180px] rounded-md p-1 bg-slate-100 font-mono">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">用戶身份</p>
          <p className="truncate text-sm max-w-[180px] rounded-md p-1 bg-slate-100 font-mono">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">雙重身分驗證</p>
          <Badge className="cursor-pointer text-sm rounded-md p-x-4 font-mono" variant={user?.isTwoFactorEnabled ? "success": "destructive" }>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;

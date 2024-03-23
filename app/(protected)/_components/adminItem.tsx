"use client";
import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPageItem = () => {
  const onServerActionClick =()=>{
    admin().then(data=>{
      if(data.error){
        toast.error(data.error)
      }
      if(data.success){
        toast.success(data.success)
      }
    })
  }
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("許可使用的 API路由")
      } else {
       toast.error("禁止使用的 API路由!")
      }
    });
  };
  return (
    <Card className="w-screen h-full border-none sm:border rounded-none sm:rounded-lg sm:h-auto sm:w-[600px]">
      <CardHeader>  
        <p className="text-2xl font-semibold text-center">🔑 管理員</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="您可以看到此內容！" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p> API 路由僅限管理員</p>
          <Button onClick={onApiRouteClick}>點擊測試</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>伺服器僅限管理員操作</p>
          <Button onClick={onServerActionClick}>點擊測試</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPageItem;

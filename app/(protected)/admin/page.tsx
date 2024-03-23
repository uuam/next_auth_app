import { Metadata } from "next";
import AdminPageItem from "../_components/adminItem";

export const metadata: Metadata = {
  title: "管理員權限",
};

const AdminPage = () => {
  return <AdminPageItem />;
};

export default AdminPage;

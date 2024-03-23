import { Metadata } from "next";
import ClientPageItem from "../_components/clientItem";

export const metadata: Metadata = {
  title: "客戶端",
};
const ClientPage = () => {
  return <ClientPageItem />;
};

export default ClientPage;

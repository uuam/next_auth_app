import UserInfo from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "伺服器端",
};

const ServerPage = async () => {
  // let user;
  // try {
  //   user = await currentUser();

  // } catch (error) {
  //   console.error(error);
  // }
  const user = await currentUser();

  if (user) return <UserInfo label="💻 伺服器端組件" user={user} />;
};

export default ServerPage;

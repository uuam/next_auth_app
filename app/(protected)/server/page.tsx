import UserInfo from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return <UserInfo label="💻 伺服器端組件" user={user} />;
};

export default ServerPage;

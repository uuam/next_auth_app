import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingPage = async () => {
  const session = await auth();
  console.log('session',session)
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};
export default SettingPage;

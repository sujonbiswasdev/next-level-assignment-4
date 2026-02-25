import ProfileModal from "@/components/profilemodel";
import { getSession } from "@/services/service";
import { User } from "@/types/user/user";

export default async function ProfilePage() {
  const session = await getSession();
  return <ProfileModal user={session.data.result as User}/>;
}
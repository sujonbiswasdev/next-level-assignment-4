import ProfileModal from "@/components/profilemodel";
import { getSession } from "@/services/service";
import { User } from "@/types/user/user";

export default async function ProfilePage() {
  const session = await getSession();
    if (!session.data || session.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return <ProfileModal user={session.data.result as User}/>;
}
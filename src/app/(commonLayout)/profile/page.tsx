import ProfileModal from "@/components/profilemodel";
import { getSession } from "@/services/auth.service";
import { ApiResponse } from "@/types/response.type";
import { TUser } from "@/types/user.type";
export default async function ProfilePage() {
  const session = await getSession();
    if (!session || !session.data || !session.success) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
   const userinfo=session.data
  return <ProfileModal user={userinfo as TUser}/>;
}
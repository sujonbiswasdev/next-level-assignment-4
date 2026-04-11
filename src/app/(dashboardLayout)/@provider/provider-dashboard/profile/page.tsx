import ProviderProfilePage from '@/components/modules/provider/profileCard'
import { getSession } from '@/services/auth.service';
import { TUser } from '@/types/user.type';
const ProviderProfile = async () => {
    const user=await getSession()
      if (!user || user.error || !user.success) {
    return (
      <div className="p-4 text-red-500">
        Failed to load provider profile
      </div>
    );
  }    
  return (
    <div>
        <ProviderProfilePage userdata={user.data as TUser}/>
    </div>
  )
}

export default ProviderProfile

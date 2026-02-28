import ProviderProfilePage from '@/components/provider/profileCard'
import { getSession, getuserProvider } from '@/services/service'
import React from 'react'

const ProviderProfile = async () => {
    const user=await getSession()
    console.log(user,"data")
      if (!user || user.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }    
  return (
    <div>
        <ProviderProfilePage userdata={user.data.result}/>
    </div>
  )
}

export default ProviderProfile

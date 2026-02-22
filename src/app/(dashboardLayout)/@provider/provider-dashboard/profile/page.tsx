import ProviderProfilePage from '@/components/provider/profileCard'
import { getSession, getuserProvider } from '@/services/service'
import React from 'react'

const ProviderProfile = async () => {
    const user=await getSession()
    const provider=await getuserProvider()
    
  return (
    <div>
        <ProviderProfilePage userdata={user.data.result}/>
    </div>
  )
}

export default ProviderProfile

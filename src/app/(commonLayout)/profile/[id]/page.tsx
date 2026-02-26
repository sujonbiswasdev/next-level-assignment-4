import SingleProfile from '@/components/singleprofile'
import { AdminService } from '@/services/users/admin'
import React from 'react'

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = await params
    const userprofile = await AdminService.getuserbyid(id.id)
    console.log(userprofile,'userdfsldj')
 
    const userdata=userprofile
       if (!userdata.data || userdata.error) {
        return (
            <div className="p-4 text-red-500">
                Failed to load users
            </div>
        );
    }
    return (
        <div>
            <SingleProfile user={userdata} />
        </div>
    )
}

export default UserProfile

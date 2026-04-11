import SingleProfile from '@/components/singleprofile'
import { AdminService } from '@/services/users/admin'
import { TUser } from '@/types/user.type'
import React from 'react'

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = await params
    const userprofile = await AdminService.getuserbyid(id.id)
       if (!userprofile?.data || !userprofile.success) {
        return (
            <div className="p-4 text-red-500">
                Failed to load users
            </div>
        );
    }
    return (
        <div>
            <SingleProfile user={userprofile.data as TUser} />
        </div>
    )
}

export default UserProfile

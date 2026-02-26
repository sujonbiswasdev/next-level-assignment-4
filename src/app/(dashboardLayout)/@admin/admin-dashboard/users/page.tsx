import { getAllusers } from '@/actions/user/admin'
import UsersTable from '@/components/modules/users/usertable'
import React from 'react'

interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}
const Userpage =async ({ searchParams }: PageProps) => {
  const search=await searchParams
  const users=await getAllusers(search)

  if (!users || users.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  const userdata=users.data.result.data || {}
  const pagination=users.data.result.pagination || {}
  
  return (
    <div>
        <UsersTable users={userdata} pagination={pagination}/>
      
    </div>
  )
}

export default Userpage

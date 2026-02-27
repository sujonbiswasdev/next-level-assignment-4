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
  const {data,pagination}=await getAllusers(search)

  if (!data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  
  return (
    <div>
        <UsersTable users={data} pagination={pagination}/>
      
    </div>
  )
}

export default Userpage

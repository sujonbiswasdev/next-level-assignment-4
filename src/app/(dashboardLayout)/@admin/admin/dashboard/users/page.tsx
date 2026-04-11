import { getAllusers } from '@/actions/user.actions'
import React from 'react'

interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}
const Userpage =async ({ searchParams }: PageProps) => {
  const search=await searchParams
  const res=await getAllusers(search)

  if (!res.success || !res.data) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  
  return (
    <div>
        {/* <UsersTable users={res.data as any} pagination={res as any}/> */}
      
    </div>
  )
}

export default Userpage

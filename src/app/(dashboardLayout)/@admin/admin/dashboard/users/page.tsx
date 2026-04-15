import { getAllusers } from '@/actions/user.actions'
import UserTable from '@/components/modules/users/usertable'
import { Ipagination } from '@/types/pagination.type'
import { TResponseUserData } from '@/types/user.type'
import React from 'react'

interface PageProps {
  searchParams: {
    category_name?: string
    isAvailable?: string
  }
}
const Userpage =async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
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
        <UserTable users={res.data as TResponseUserData<{ accounts: { password: string; }}>[]} pagination={res.pagination as Ipagination}/>
    </div>
  )
}

export default Userpage

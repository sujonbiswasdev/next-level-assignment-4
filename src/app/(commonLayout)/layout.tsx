import { Navbar } from '@/components/shared/Navbar'
import React from 'react'

const CommonLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='px-2 sm:px-4 lg:px-8'>
        <Navbar className='flex mx-auto'/>
      {children}
    </div>
  )
}

export default CommonLayout

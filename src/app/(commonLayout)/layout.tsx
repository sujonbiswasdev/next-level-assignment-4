import { Navbar } from '@/components/shared/Navbar'
import React from 'react'

const CommonLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar className='flex mx-auto'/>
      {children}
    </div>
  )
}

export default CommonLayout

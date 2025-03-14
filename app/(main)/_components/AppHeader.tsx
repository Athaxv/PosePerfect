import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader() {
  return (
    <div className='p-3 flex justify-between w-full'>
        <SidebarTrigger />
        <UserButton/>
    </div>
  )
}

export default AppHeader
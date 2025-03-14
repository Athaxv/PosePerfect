"use client"
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'

function AppHeader() {
  const path = usePathname();
  return (
    <div className='p-3 flex justify-between w-full'>
      <div className='flex gap-4'>
        <SidebarTrigger />
        {/* {path ? } */}
        </div>
        <UserButton/>
    </div>
  )
}

export default AppHeader
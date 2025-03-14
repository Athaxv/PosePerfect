import { SidebarProvider } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'

function Provider({ children }: { children: ReactNode}) {
  return (
    <SidebarProvider>
        <AppSidebar/>
    <div className='w-full'>
        <AppHeader/>
        {children}
    </div>
    </SidebarProvider>
  )
}

export default Provider
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'

function Provider({ children }: { children: ReactNode}) {
  return (
    <div>
        <SidebarProvider>
        {children}
        </SidebarProvider>
    </div>
  )
}

export default Provider
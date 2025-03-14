"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import { Atom, ChartLine, ChartNoAxesColumn, ChartNoAxesCombined, LoaderPinwheel, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
  
  const menuItems = [
    {
      title: "Pose Detector",
      url: '/dashboard',
      image: Atom,
    },
    {
      title: "Feedback",
      url: '/feedback',
      image: MessageSquare,
    },
    {
      title: "Analysis",
      url: '/analysis',
      image: ChartNoAxesCombined,
    },
    {
      title: "Progress",
      url: '/progress',
      image: LoaderPinwheel,
    },
  ]
  export function AppSidebar() {
    const path = usePathname();
    return (
      <Sidebar>
        <SidebarHeader>
          <div className="p-3 flex gap-2 items-center">
            <Image src={'newlogo.svg'} alt="logo" height={40} width={40}></Image>
            {/* <h2 className="font-bold text-2xl text-blue-400">PosePerfect</h2> */}
          </div>
          <Button variant={'outline'}>AI-Powered Pose Detection</Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {menuItems.map((menu, index) => (
                <SidebarMenuItem className="pt-3 pb-3 flex justify-start" key={index}>
                  <SidebarMenuButton isActive={path === menu.url}>
                  <Link href={menu.url} className="">
                    <div className="flex gap-2 p-3">
                      <menu.image></menu.image>
                      <span className="">{menu.title}</span>
                    </div>
                  </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )) }
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup />
        
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
      </Sidebar>
    )
  }
  
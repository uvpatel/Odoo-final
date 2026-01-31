"use client"

import * as React from "react"
// import { Shadow } from "lucide-react";


import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { getSidebarData } from "@/config/sidebar-data"
import { useAuthStore } from "@/store/useAuthStore"
// import {  IconInnerShadowTopLeft } from "@tabler/icons-react";

import { ArrowUpLeft } from "lucide-react"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const role = useAuthStore((s) => s.user?.role ?? "EMPLOYEE")
  const data = getSidebarData(role)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                {/* <IconInnerShadowTopLeft className="size-5!" /> */}
                <ArrowUpLeft className="w-5 h-5" />
                {/* <Shadow size={24} className="size-5!" /> */}

                <span className="text-base font-semibold">Shiv Furniture</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

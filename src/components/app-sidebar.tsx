import * as React from "react";
import {
  Home,
  GraduationCap,
  Users,
  LibraryBig,
  ChartArea,
} from "lucide-react";

import { Logo } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      items: [
        {
          title: "Home",
          url: "/dashboard",
          icon: Home,
        },
        {
          title: "Students",
          url: "/dashboard/students",
          icon: GraduationCap,
        },
        {
          title: "Teachers",
          url: "#",
          icon: Users,
        },
        {
          title: "Class",
          url: "#",
          icon: LibraryBig,
        },
        {
          title: "Analytics",
          url: "#",
          icon: ChartArea,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon size={30} className="stroke-blue-500" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

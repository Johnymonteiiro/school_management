"use client";

import * as React from "react";
import {
  AudioWaveform,
  Book,
  BookOpen,
  Bot,
  ChartArea,
  Command,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  Home,
  LibraryBig,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-project";
import { Brand } from "./teams-switch";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  home: [
    {
      name: "Overviews",
      url: "/dashboard",
      icon: Home,
    },
  ],
  sessions: [
    {
      title: "Students",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "Register",
          url: "/dashboard/students",
        },
        {
          title: "Enrollment in the subject",
          url: "#",
        },
        {
          title: "My subjects",
          url: "#",
        },
        {
          title: "My classes",
          url: "#",
        },
        {
          title: "My Profile",
          url: "#",
        },
      ],
    },
    {
      title: "Teachers",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Register",
          url: "/dashboard/teachers",
        },
        {
          title: "Class",
          url: "#",
        },
        {
          title: "Subjects",
          url: "#",
        },
        {
          title: "Students",
          url: "#",
        },
      ],
    },
    {
      title: "Class",
      icon: LibraryBig,
      items: [
        {
          title: "Register",
          url: "/dashboard/class",
        },
      ],
    },
    {
      title: "Subjects",
      icon: Book,
      items: [
        {
          title: "Register",
          url: "/dashboard/subjects",
        },
      ],
    },
    {
      title: "AI Analytics",
      icon: Bot,
      items: [
        {
          title: "Students analytics",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: ChartArea,
      items: [
        {
          title: "Students analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.home} />
        <NavMain items={data.sessions} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

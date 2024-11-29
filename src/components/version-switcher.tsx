"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function Logo() {
  return (
    <SidebarMenu className="py-3 rounded bg-blue-500 shadow">
      <SidebarMenuItem>
        <h1 className="text-center text-zinc-50 font-bold">School Management</h1>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

"use client";

import { AppSidebar } from "@/components/sidebar/app";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/user";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const pathSegments = pathname?.split("/").filter(Boolean);
  const getLink = (index: number) => {
    return `/${pathSegments?.slice(0, index + 1).join("/")}`;
  };


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 justify-between items-center px-4 border-b">
          <div className="flex h-16 shrink-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments?.map((segment, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={getLink(index + 1)}>
                        {segment.replace(/-/g, " ").toUpperCase()}
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <NavUser
            user={{
              avatar: "",
              name: "John Doe",
              email: "john.doe@example.com",
            }}
          />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

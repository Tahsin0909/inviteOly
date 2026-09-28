import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-[#FAF9F6] dark:bg-[#0F0F0F] text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
                <AppSidebar />
                <SidebarInset className="flex flex-col flex-1 min-w-0 bg-[#FAF9F6] dark:bg-[#0F0F0F]">
                    <DashboardHeader />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

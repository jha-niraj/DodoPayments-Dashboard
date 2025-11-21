"use client"

import { cn } from "@/lib/utils";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useSidebar } from "./sidebar-context";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className={cn(
                "flex flex-col flex-1 w-full transition-all duration-300",
                "lg:ml-64",
                isCollapsed && "lg:ml-[90px]"
            )}>
                <Navbar />
                <main className="flex-1 overflow-auto pt-[72px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
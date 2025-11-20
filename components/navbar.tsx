"use client";

import { Search, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const { isCollapsed } = useSidebar();

    return (
        <header className={cn(
            "fixed top-0 right-0 bg-card px-8 py-4 z-30 transition-all duration-300",
            "left-0 md:left-64",
            isCollapsed && "md:left-[90px]"
        )}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Arthur Taylor</h1>
                    <p className="text-sm text-muted-foreground">Welcome back to Apex 👋</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                        <Search className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="w-10 h-10 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Move Money →
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
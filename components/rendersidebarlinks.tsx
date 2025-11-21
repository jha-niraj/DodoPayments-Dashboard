"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import {
    Tooltip, TooltipTrigger, TooltipContent
} from "@/components/ui/tooltip";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

export interface NavItem {
    to: string;
    label: string;
    icon: React.ReactNode;
    status?: string;
}

export type NavItems = NavItem[];

interface NavItemBaseProps {
    item: NavItem;
    isActive: boolean;
}

const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.status === "coming_soon") {
        e.preventDefault();
        toast.info("Coming Soon!", {
            description: `${item.label} feature will be available soon. Stay tuned!`,
            duration: 3000,
        });
    }
};

const NavItemBase: React.FC<NavItemBaseProps> = ({ item, isActive }) => (
    <>
        {
            isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-blue-600 rounded-r-full" />
            )
        }

        <div
            className={cn(
                "w-5 h-5 flex-shrink-0 flex items-center justify-center transition-colors",
                isActive ? "text-blue-600" : "text-muted-foreground group-hover:text-foreground"
            )}
        >
            {item.icon}
        </div>
    </>
);

interface NavItemCollapsedProps extends NavItemBaseProps { }

const NavItemCollapsed: React.FC<NavItemCollapsedProps> = ({ item, isActive }) => (
    <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
            <Link
                href={item.to}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                    "relative flex items-center justify-center gap-3 p-3 rounded-lg text-sm transition-all group",
                    isActive
                        ? "bg-secondary text-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
            >
                <NavItemBase item={item} isActive={isActive} />
            </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
            <p>{item.label}</p>
            {
                item.status === "coming_soon" && (
                    <p className="text-xs text-orange-600">Coming Soon</p>
                )
            }
        </TooltipContent>
    </Tooltip>
);

interface NavItemExpandedProps extends NavItemBaseProps { }

const NavItemExpanded: React.FC<NavItemExpandedProps> = ({ item, isActive }) => (
    <Link
        href={item.to}
        onClick={(e) => handleNavClick(e, item)}
        className={cn(
            "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
            isActive
                ? "bg-secondary text-foreground font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
    >
        <NavItemBase item={item} isActive={isActive} />

        <span className="whitespace-nowrap">{item.label}</span>

        {isActive && <ChevronRight className="ml-auto" />}
    </Link>
);


interface NavMenuProps {
    items: NavItems;
    isCollapsed: boolean;
}
export const NavMenu: React.FC<NavMenuProps> = ({ items, isCollapsed }) => {
    const pathname = usePathname();

    return (
        <>
            {
                items.map((item) => {
                    const isActive = pathname === item.to;

                    return isCollapsed ? (
                        <NavItemCollapsed key={item.to} item={item} isActive={isActive} />
                    ) : (
                        <NavItemExpanded key={item.to} item={item} isActive={isActive} />
                    );
                })
            }
        </>
    );
};
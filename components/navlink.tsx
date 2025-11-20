"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<React.ComponentProps<typeof Link>, "href"> {
    to: string;
    activeClassName?: string;
    pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
        const pathname = usePathname();

        const isActive = pathname === to;
        // Next.js doesn't have pending state, so we mimic it:
        const isPending = false;

        return (
            <Link
                ref={ref}
                href={to}
                className={cn(
                    className,
                    isActive && activeClassName,
                    isPending && pendingClassName
                )}
                {...props}
            />
        );
    }
);

NavLink.displayName = "NavLink";

export { NavLink };
"use client";

import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { SidebarProvider, useSidebar } from "@/components/sidebar-context";
import { cn } from "@/lib/utils";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-space-grotesk',
})
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
	const { isCollapsed } = useSidebar();

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<div className={cn(
				"flex flex-col flex-1 w-full transition-all duration-300",
				"md:ml-64",
				isCollapsed && "md:ml-[90px]"
			)}>
				<Navbar />
				<main className="flex-1 overflow-auto pt-[72px]">
					{children}
				</main>
			</div>
		</div>
	);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${spaceGrotesk.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
				<SidebarProvider>
					<LayoutContent>
						{children}
					</LayoutContent>
				</SidebarProvider>
			</body>
		</html>
	);
}
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/sidebar-context";
import { ThemeProvider } from "@/components/themeproviders";
import { Metadata } from "next";
import LayoutContent from "@/components/layoutcontent";

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

export const metadata: Metadata = {
	title: "DodoPayments Dashboard",
	description: "This is an assignment for the dodopayments dashboard"
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<link rel="icon" href="/icon.svg" />
			</head>
			<body className={`${spaceGrotesk.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<LayoutContent>
							{children}
						</LayoutContent>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
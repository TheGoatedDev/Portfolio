import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Thomas Burridge | Developer Portfolio",
	description: "A showcase of Thomas Burridge's work and skills as a developer",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			]
			<Script
				defer
				src="https://umami.thegoated.dev/script.js"
				data-website-id="d58bbedb-5107-4961-8202-5d64643f6745"
			/>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

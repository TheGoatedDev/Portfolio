import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://thegoated.dev"),
	title: {
		template: "%s | Thomas Burridge",
		default: "Thomas Burridge | Developer Portfolio",
	},
	description: "A showcase of Thomas Burridge's work and skills as a developer",
	keywords: [
		"software engineer",
		"full-stack developer",
		"Next.js",
		"React",
		"TypeScript",
		"portfolio",
	],
	authors: [{ name: "Thomas Burridge", url: "https://thegoated.dev" }],
	creator: "Thomas Burridge",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://thegoated.dev",
		siteName: "Thomas Burridge",
		title: "Thomas Burridge | Developer Portfolio",
		description: "A showcase of Thomas Burridge's work and skills as a developer",
	},
	twitter: {
		card: "summary_large_image",
		title: "Thomas Burridge | Developer Portfolio",
		description: "A showcase of Thomas Burridge's work and skills as a developer",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
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

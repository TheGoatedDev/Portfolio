import "@/app/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import type React from "react";

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
	display: "swap",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
	display: "swap",
});

const sourceSerif = Source_Serif_4({
	subsets: ["latin"],
	variable: "--font-source-serif",
	weight: ["300", "400", "500", "600"],
	style: ["normal", "italic"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://thegoated.dev"),
	title: {
		template: "%s | Thomas Burridge",
		default: "Thomas Burridge — Software engineer, available for freelance",
	},
	description:
		"Thomas Burridge builds infrastructure-heavy products: SaaS, IoT, and multi-tenant systems. Selected work, working notes, contact.",
	keywords: [
		"freelance software engineer",
		"contract developer",
		"Next.js",
		"TypeScript",
		"DevOps",
		"SaaS",
		"IoT",
	],
	authors: [{ name: "Thomas Burridge", url: "https://thegoated.dev" }],
	creator: "Thomas Burridge",
	openGraph: {
		type: "website",
		locale: "en_GB",
		url: "https://thegoated.dev",
		siteName: "Thomas Burridge",
		title: "Thomas Burridge — Software engineer, available for freelance",
		description:
			"Selected work, working notes, contact. Infrastructure-heavy products: SaaS, IoT, multi-tenant systems.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Thomas Burridge — Software engineer, available for freelance",
		description:
			"Selected work, working notes, contact. Infrastructure-heavy products: SaaS, IoT, multi-tenant systems.",
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
		<html lang="en">
			<Script
				defer
				src="https://umami.thegoated.dev/script.js"
				data-website-id="d58bbedb-5107-4961-8202-5d64643f6745"
			/>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} font-sans`}
			>
				{children}
			</body>
		</html>
	);
}

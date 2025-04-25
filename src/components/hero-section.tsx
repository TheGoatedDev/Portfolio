"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import type { COBEOptions } from "cobe";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { GLOBE_CONFIG, Globe } from "./magicui/globe";

export function HeroSection() {
	const [typedText, setTypedText] = useState("");
	const { theme } = useTheme();
	const fullText = "Full Stack Developer";
	const typingSpeed = 100;

	const globeConfig = useMemo(
		() =>
			({
				...GLOBE_CONFIG,
				dark: theme === "dark" ? 1 : 0,
				markers: [
					{
						location: [50.7245078, -3.5959463],
						size: 0.05,
					},
					{
						location: [51.4685873, -2.7555175],
						size: 0.05,
					},
					{
						location: [51.5286071, -0.4312081],
						size: 0.05,
					},
					{
						location: [3.964821521588462, 101.88031643909612],
						size: 0.05,
					},
					{
						location: [-33.88241162190349, 151.1933177941568],
						size: 0.05,
					},
					{
						location: [33.446969178844476, -112.07664102796447],
						size: 0.05,
					},
					{
						location: [36.16886838006052, -86.78477420927919],
						size: 0.05,
					},
					{
						location: [32.773270775788404, -96.7859080315704],
						size: 0.05,
					},
					{
						location: [-33.9789085716506, 18.619530398235746],
						size: 0.05,
					},
					{
						location: [25.201868493230105, 55.269459953643505],
						size: 0.05,
					},
					{
						location: [41.88907946094956, 12.492837520978327],
						size: 0.05,
					},
					{
						location: [34.689298348352416, 33.00632029680025],
						size: 0.05,
					},
					{
						location: [43.6642607753493, -79.38066173222431],
						size: 0.05,
					},
				],
			}) satisfies COBEOptions,
		[theme],
	);

	useEffect(() => {
		if (typedText.length < fullText.length) {
			const timeout = setTimeout(() => {
				setTypedText(fullText.slice(0, typedText.length + 1));
			}, typingSpeed);
			return () => clearTimeout(timeout);
		}
	}, [typedText]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<section className="relative min-h-screen flex flex-col">
			<Header />

			<div className="flex-1 flex items-center">
				<div className="container max-w-6xl">
					<motion.div
						className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<motion.div
							variants={itemVariants}
							className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start"
						>
							<div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background">
								<div className="relative  h-2 w-2 mr-2">
									<span className="flex h-2 w-2 rounded-full bg-primary mr-2 absolute" />
									<span className="flex h-2 w-2 rounded-full bg-primary mr-2 absolute animate-ping" />
								</div>
								<span>Available for new projects</span>
							</div>

							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
								Hi, I'm <span className="text-primary">Thomas Burridge</span>
							</h1>

							<div className="h-8 md:h-10">
								<h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
									{typedText}
									<span className="animate-blink">|</span>
								</h2>
							</div>

							<p className="text-lg md:text-xl text-muted-foreground max-w-lg">
								I build exceptional digital experiences that combine elegant
								design with robust functionality.
							</p>

							<div className="flex flex-row gap-4 pt-4">
								<Button size="lg" className="group" asChild>
									<Link href="#projects">
										View My Work
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
								<Button size="lg" variant="outline" asChild>
									<Link href="#contact">
										Contact Me
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="absolute lg:relative"
						>
							<div className="relative h-[450px] w-full">
								<Globe config={globeConfig} />
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>

			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
				<motion.div
					initial={{ y: 0 }}
					animate={{ y: [0, 10, 0] }}
					transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
					className="flex flex-col items-center"
				>
					<div className="text-sm font-medium mb-2">Scroll Down</div>
					<div className="h-10 w-6 rounded-full border-2 flex justify-center pt-1">
						<motion.div
							initial={{ y: 0 }}
							animate={{ y: [0, 10, 0] }}
							transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
							className="h-2 w-2 rounded-full bg-primary"
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

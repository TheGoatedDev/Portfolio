"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Link } from "lucide-react";
import { useMemo, useState } from "react";

const Category = {
	fullstack: "Full Stack",
	frontend: "Frontend",
	backend: "Backend",

	devops: "DevOps",
} as const;

type Project = {
	title: string;
	description: string;
	image: string;
	tags: string[];
	category: keyof typeof Category;
	liveUrl?: string;
	githubUrl?: string;
};

const projects: Project[] = [
	{
		title: "MirrorQuay",
		description:
			"A Docker registry mirroring service. It is a simple and easy to use Docker registry mirroring service that allows you to mirror any Docker registry to any other Docker registry.",
		image: "/projects/mirrorquay.png?height=600&width=800",
		tags: [
			"NextJS",
			"TypeScript",
			"TRPC",
			"MySQL",
			"Docker",
			"TailwindCSS",
			"Cryptography",
		],
		category: "fullstack",
		liveUrl: "https://mirrorquay.com/",
	},
	{
		title: "BitProxy",
		description:
			"A API and admin dashboard to handle Bitcoin payment processing. It's built for developers who need to integrate Bitcoin payments into their applications without managing the payment infrastructure themselves.",
		image: "/projects/bitproxy.png?height=600&width=800",
		tags: ["NextJS", "TypeScript", "TRPC", "MySQL", "Crypto", "Bitcoin"],
		category: "fullstack",
		// githubUrl: "https://github.com/TheGoatedDev/BitProxy",
		// liveUrl: "https://bitproxy.thegoated.dev/",
	},
	{
		title: "RescueCore",
		description:
			"RescueCore is a comprehensive animal shelter management system designed to help shelters, rescue organizations, and animal care facilities manage their animals, volunteers, fosters, and adopters with modern tools and intuitive workflows.",
		tags: ["Docker", "NextJS", "TRPC", "MySQL", "S3"],
		category: "fullstack",
		image: "/projects/rescuecore.png?height=600&width=800",
		liveUrl: "https://rescuecore.thegoated.dev/",
	},
	{
		title: "Personal K8s Cluster",
		description:
			"A personal K8s cluster running on a Hetzner. It is used to run my personal projects and services.",
		image: "/projects/k8s.png?height=600&width=800",
		tags: ["Personal", "Kubernetes", "Hetzner", "Docker", "HAProxy"],
		category: "devops",
	},
	{
		title: "All-The-Infra",
		description:
			"A comprehensive development infrastructure setup using Docker Compose, providing databases, message queues, mail testing, and monitoring solutions all pre-configured for immediate use.",
		image: "/docker.svg?height=600&width=800",
		tags: [
			"Docker",
			"Docker Compose",
			"DevOps",
			"Infrastructure",
			"Monitoring",
			"Databases",
		],
		category: "devops",
		githubUrl: "https://github.com/TheGoatedDev/All-The-Infra",
	},
	{
		title: "GitRuley",
		description:
			"A tool to help you mass manage your GitHub rules. It is a web application that allows you to create, edit, and delete GitHub rules. With no Database, meaning it is completely free to use.",
		image: "/projects/gitruley.png?height=600&width=800",
		tags: ["Personal", "React", "Node.js", "Next.js", "Tailwind CSS"],
		category: "fullstack",
		githubUrl: "https://github.com/TheGoatedDev/gitruley",
		liveUrl: "https://gitruley.thegoated.dev/",
	},
	{
		title: "EnterpriseNest",
		description:
			"Enterprise-Nest is an enterprise-level API framework built on top of NestJS. It is designed with scalability, best practices, and robustness in mind. The architecture of the framework is based on Domain-Driven Design (DDD), Onion Architecture, Clean Architecture, and Hexagonal Architecture.",
		image: "/projects/enterprisenest.svg?height=600&width=800",
		tags: ["Personal", "NestJS", "TypeScript", "Docker"],
		category: "backend",
		githubUrl: "https://github.com/TheGoatedDev/EnterpriseNest",
	},
	{
		title: "Data Warehouse",
		description:
			"A low-cost cloud file storage solution using Amazon S3, operating independently of a database. Provides secure, scalable storage without the overhead of maintaining database systems.",
		image: "/projects/datawarehouse.jpeg?height=600&width=800",
		tags: [
			"AWS",
			"Next.js",
			"TypeScript",
			"Amazon S3",
			"React Query",
			"Mantine UI",
		],
		category: "fullstack",
		githubUrl: "https://github.com/TheGoatedDev/Data-Warehouse",
	},
	{
		title: "PowerPortal",
		description:
			"An IoT portal for monitoring and controlling Solar-Diesel Hybrid Generators in real-time. Features data ingress using AWS IoT Core, real-time monitoring, and a firmware updater.",
		image: "/projects/powerportal.jpeg?height=600&width=800",
		tags: [
			"Next.js",
			"AWS",
			"IoT",
			"TypeScript",
			"TRPC",
			"Express",
			"Socket.IO",
			"DynamoDB",
		],
		category: "fullstack",
	},
	{
		title: "Secure IoT Device Management VPN",
		description:
			"Implemented AWS Site-to-Site VPN to establish secure connections between internal networks and external Cellular Network providers for IoT device management.",
		image: "/projects/awsvpnsitetosite.png?height=600&width=800",
		tags: ["AWS VPN", "IoT", "Network Security", "Solution Architecture"],
		category: "devops",
	},
	{
		title: "Lighting Portal",
		description:
			"Refactored a web application for solar lighting tower management with real-time monitoring, control features, and optimized energy consumption tracking.",
		image: "/projects/lightingportal.png?height=600&width=800",
		tags: ["AWS", "Node.js", "Express", "Socket.IO", "DynamoDB", "IoT"],
		category: "fullstack",
	},
];

export function ProjectsSection() {
	const [activeTab, setActiveTab] = useState("all");

	const filteredProjects = useMemo(() => {
		return activeTab === "all"
			? projects
			: projects.filter((project) => project.category === activeTab);
	}, [activeTab]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
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
		<section id="projects" className="py-20 md:py-32 bg-muted/30">
			<div className="container">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						A collection of my recent work showcasing my skills and experience
						in building digital products.
					</p>
				</div>

				<Tabs
					value={activeTab}
					defaultValue="all"
					className="w-full max-w-3xl mx-auto mb-12"
					onValueChange={setActiveTab}
				>
					<TabsList className="w-full">
						<TabsTrigger value="all">All</TabsTrigger>
						{Object.entries(Category).map(([key, value]) => (
							<TabsTrigger key={key} value={key}>
								{value}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>

				<motion.div
					key={activeTab}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					viewport={{ margin: "-100px" }}
				>
					{filteredProjects.map((project) => (
						<motion.div key={project.title} variants={itemVariants}>
							<ProjectCard project={project} />
						</motion.div>
					))}

					{filteredProjects.length === 0 && (
						<div className="w-full col-span-full flex items-center justify-center text-center text-muted-foreground">
							No projects found
						</div>
					)}
				</motion.div>

				<div className="text-center mt-16">
					<Button size="lg" variant="outline" className="group" asChild>
						<a
							href="https://github.com/TheGoatedDev"
							target="_blank"
							rel="noreferrer"
						>
							View All Projects
							<ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}

function ProjectCard({ project }: { project: Project }) {
	return (
		<Card className="overflow-hidden group h-full flex flex-col py-0">
			<div className="relative overflow-hidden aspect-video">
				<img
					src={project.image || "/placeholder.svg"}
					alt={project.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
			<CardContent className="flex-1 flex flex-col p-4">
				<div className="flex-1">
					<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
						{project.title}
					</h3>
					<p className="text-muted-foreground mb-4">{project.description}</p>
					<div className="flex flex-wrap gap-2 mb-6">
						{project.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
				</div>
				{(project.githubUrl || project.liveUrl) && (
					<div className="flex gap-4 mt-auto pt-4 border-t">
						{project.githubUrl && (
							<Button variant="ghost" size="sm" asChild>
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github className="h-4 w-4 mr-2" />
									Code
								</a>
							</Button>
						)}
						{project.liveUrl && (
							<Button variant="ghost" size="sm" asChild>
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<ExternalLink className="h-4 w-4 mr-2" />
									Live Demo
								</a>
							</Button>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

"use client";

import type React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Database, Layout, Lightbulb, Server } from "lucide-react";

type Skill = {
	name: string;
	level: number;
	category: string;
};

type SkillCategory = {
	name: string;
	icon: React.ReactNode;
	skills: Skill[];
};

const skillCategories: SkillCategory[] = [
	{
		name: "Frontend Development",
		icon: <Layout className="h-6 w-6" />,
		skills: [
			{ name: "React", level: 90, category: "frontend" },
			{ name: "TypeScript", level: 85, category: "frontend" },
			{ name: "Next.js", level: 80, category: "frontend" },
			{ name: "CSS/Tailwind", level: 85, category: "frontend" },
		],
	},
	{
		name: "Backend Development",
		icon: <Server className="h-6 w-6" />,
		skills: [
			{ name: "Node.js", level: 85, category: "backend" },
			{ name: "Express", level: 80, category: "backend" },
			{ name: "REST APIs", level: 90, category: "backend" },
			{ name: "GraphQL", level: 75, category: "backend" },
		],
	},
	{
		name: "Database",
		icon: <Database className="h-6 w-6" />,
		skills: [
			{ name: "MongoDB", level: 85, category: "database" },
			{ name: "PostgreSQL", level: 80, category: "database" },
			{ name: "Redis", level: 70, category: "database" },
			{ name: "Firebase", level: 75, category: "database" },
		],
	},
	{
		name: "Other Skills",
		icon: <Lightbulb className="h-6 w-6" />,
		skills: [
			{ name: "Git/GitHub", level: 90, category: "tools" },
			{ name: "Docker", level: 75, category: "tools" },
			{ name: "CI/CD", level: 80, category: "tools" },
			{ name: "Testing", level: 75, category: "tools" },
		],
	},
];

export function SkillsSection() {
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
		<section id="skills" className="py-20 md:py-32">
			<div className="container">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						A comprehensive overview of my technical skills and expertise in
						various technologies.
					</p>
				</div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					{skillCategories.map((category) => (
						<motion.div key={category.name} variants={itemVariants}>
							<SkillCard category={category} />
						</motion.div>
					))}
				</motion.div>

				<div className="mt-20">
					<h3 className="text-2xl font-bold text-center mb-12">
						Technologies I Work With
					</h3>
					<TechGrid />
				</div>
			</div>
		</section>
	);
}

function SkillCard({ category }: { category: SkillCategory }) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center gap-4">
				<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
					{category.icon}
				</div>
				<div>
					<CardTitle>{category.name}</CardTitle>
					<CardDescription>{category.skills.length} skills</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				{category.skills.map((skill) => (
					<div key={skill.name} className="space-y-2">
						<div className="flex justify-between">
							<span className="font-medium">{skill.name}</span>
							<span className="text-muted-foreground">{skill.level}%</span>
						</div>
						<Progress value={skill.level} className="h-2" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

function TechGrid() {
	const technologies = [
		{ name: "React", icon: "/react.svg?height=80&width=80" },
		{ name: "Node.js", icon: "/nodejs.svg?height=80&width=80" },
		{ name: "TypeScript", icon: "/typescript.svg?height=80&width=80" },
		{ name: "Next.js", icon: "/nextjs.svg?height=80&width=80" },
		{ name: "MongoDB", icon: "/mongodb.svg?height=80&width=80" },
		{ name: "PostgreSQL", icon: "/postgresql.svg?height=80&width=80" },
		{ name: "GraphQL", icon: "/graphql.svg?height=80&width=80" },
		{ name: "Tailwind CSS", icon: "/tailwind.svg?height=80&width=80" },
		{ name: "Docker", icon: "/docker.svg?height=80&width=80" },
		{ name: "Git", icon: "/git.svg?height=80&width=80" },
	];

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
			{technologies.map((tech) => (
				<motion.div
					key={tech.name}
					className="flex flex-col items-center"
					whileHover={{ y: -5 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<div className="h-20 w-20 relative mb-3">
						<img
							src={tech.icon || "/placeholder.svg"}
							alt={tech.name}
							className="w-full h-full object-contain"
						/>
					</div>
					<span className="text-sm font-medium">{tech.name}</span>
				</motion.div>
			))}
		</div>
	);
}

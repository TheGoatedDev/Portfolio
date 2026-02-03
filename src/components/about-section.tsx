"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";
import type React from "react";

export function AboutSection() {
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
		<section id="about" className="py-20 md:py-32 bg-muted/30">
			<div className="container">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						Learn more about my journey, experience, and the passion that drives
						me as a developer.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						className="relative"
					>
						<div className="relative h-[450px] w-full rounded-lg overflow-hidden">
							<img
								src="/profile.jpeg"
								alt="Thomas Burridge, professional software engineer and technology leader"
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="absolute -bottom-6 -right-6 h-48 w-48 bg-primary/10 rounded-full filter blur-3xl" />
						<span className="absolute -top-6 -left-6 h-48 w-48 bg-secondary/10 rounded-full filter blur-3xl" />
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						className="space-y-8"
					>
						<motion.div variants={itemVariants}>
							<h3 className="text-2xl font-bold mb-4">My Story</h3>
							<div className="space-y-4 text-muted-foreground">
								<p>
									Hello! I'm Thomas Burridge, a multi-faceted technology leader
									combining expertise in software development, DevOps, and
									cybersecurity. With over six years of experience, I specialize
									in building scalable solutions using AWS, TypeScript, and
									modern web technologies.
								</p>
								<p>
									As a Lead Software Engineer and DevOps Lead at Propriotec, I
									architect modern web applications using NextJS/React and
									NestJS, while managing multi-region Kubernetes deployments. My
									cybersecurity background and CompTIA CySA+ certification
									enable me to integrate robust security practices across
									infrastructure and applications.
								</p>
								<p>
									My experience spans successful database migrations, IoT
									implementations, and development of efficient CI/CD pipelines.
									I'm passionate about infrastructure as code and continuous
									innovation, consistently delivering solutions that exceed
									client expectations.
								</p>
							</div>
						</motion.div>

						<motion.div variants={itemVariants}>
							<Tabs defaultValue="experience">
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="experience">Experience</TabsTrigger>
									<TabsTrigger value="education">Education</TabsTrigger>
									<TabsTrigger value="interests">Interests</TabsTrigger>
								</TabsList>
								<TabsContent value="experience" className="space-y-4 mt-6">
									<TimelineItem
										icon={<Briefcase className="h-5 w-5" />}
										title="Lead Software Engineer & DevOps Lead"
										organization="Propriotec LTD"
										period="Apr 2024 - Present"
										description="Leading technical architecture for full-stack applications using NextJS/React and NestJS. Managing multi-region Kubernetes clusters, implementing Grafana observability, and architecting database solutions with PostgreSQL and MongoDB."
									/>
									<TimelineItem
										icon={<Briefcase className="h-5 w-5" />}
										title="Cyber Security Analyst"
										organization="Propriotec LTD"
										period="Jun 2024 - Present"
										description="Managing Wazuh SIEM/XDR for security monitoring, implementing MDM with Kandji, and conducting security audits across cloud infrastructure. Led the achievement of Cyber Essentials certification and established detection and response procedures using Grafana Suite."
									/>
									<TimelineItem
										icon={<Briefcase className="h-5 w-5" />}
										title="Director & Senior Software Engineer"
										organization="NearLunar"
										period="May 2023 - Jan 2025"
										description="Led development teams and technical strategy. Responsible for project management, client relationships, and ensuring high-quality software delivery while guiding technical architecture decisions."
									/>
									<TimelineItem
										icon={<Briefcase className="h-5 w-5" />}
										title="Senior Full Stack Engineer (Contract)"
										organization="Codeti Studio"
										period="Aug 2023 - Nov 2023"
										description="Developed a platform for the Gaming Sector focusing on Tabletop RPGs using React, NextJS, TailwindCSS, and TypeScript. Implemented data management with TanStack React Table and state management with zustand."
									/>
									<TimelineItem
										icon={<Briefcase className="h-5 w-5" />}
										title="Senior Software Engineer (Contract)"
										organization="Collide Digital Media"
										period="Jun 2023 - Jan 2024"
										description="Developed and maintained APIs for the fitness sector using NodeJS, Express, and TypeScript. Led MongoDB to PostgreSQL migration and implemented AWS solutions including Elastic Beanstalk, S3, Cognito, and SES."
									/>
									<TimelineItem
										icon={<Briefcase className="h-5 w-5" />}
										title="Software Engineer"
										organization="Prolectric Ltd"
										period="Sep 2022 - Aug 2023"
										description="Developed real-time monitoring and control system for IoT hybrid generators, implementing a web-based dashboard for remote management and working closely with hardware teams to integrate sensors and control modules."
									/>
									<TimelineItem
										icon={<Briefcase className="h-5 w-5" />}
										title="Cyber Security Analyst"
										organization="BT Group"
										period="Sep 2020 - Oct 2022"
										description="Maintained firewall whitelists, utilized IDS for monitoring network traffic, and developed automated workflow tools to increase operational efficiency. Collaborated with cross-functional teams on comprehensive security strategy."
									/>
									<TimelineItem
										icon={<Briefcase className="h-5 w-5" />}
										title="Freelance Software Engineer"
										organization="Various Clients"
										period="Jan 2020 - May 2023"
										description="Delivered full-stack web applications using Node.js, React, Express, and MongoDB. Created scalable and efficient solutions for clients across multiple industries while maintaining high quality standards."
									/>
								</TabsContent>
								<TabsContent value="education" className="space-y-4 mt-6">
									<TimelineItem
										icon={<GraduationCap className="h-5 w-5" />}
										title="Computing and Software Development Extended Diploma"
										organization="Bridgwater & Taunton College"
										period="2019 - 2020"
										description="BTEC Level 3 qualification in Computing and Software Development, achieved highest possible grade: D*D*D*"
									/>
									<TimelineItem
										icon={<GraduationCap className="h-5 w-5" />}
										title="CompTIA CySA+ Certification"
										organization="CompTIA"
										period="Issued May 2022"
										description="Advanced certification in cybersecurity analytics, enabling the integration of robust security practices across infrastructure and applications."
									/>
									<TimelineItem
										icon={<GraduationCap className="h-5 w-5" />}
										title="GIAC Certified Incident Handler (GCIH)"
										organization="GIAC Certifications"
										period="Issued Oct 2020 · Expired Oct 2024"
										description="Specialized certification for professionals who handle security incidents, demonstrating expertise in detecting, responding to, and resolving computer security incidents."
									/>
									<TimelineItem
										icon={<GraduationCap className="h-5 w-5" />}
										title="Continuous Professional Development"
										organization="Various Technical Courses"
										period="Ongoing"
										description="Regularly updating skills through specialized courses in cloud technologies, DevOps practices, infrastructure as code, and modern web development frameworks."
									/>
								</TabsContent>
								<TabsContent value="interests" className="space-y-4 mt-6">
									<p className="text-muted-foreground">
										Beyond coding, I'm passionate about infrastructure as code
										and continuous innovation in technology. I enjoy exploring
										the intersection of software development, DevOps, and
										cybersecurity to create comprehensive solutions.
									</p>
									<p className="text-muted-foreground">
										I'm committed to driving technological advancement through
										scalable cloud solutions, efficient deployment pipelines,
										and secure application development. I continuously seek new
										challenges that allow me to expand my expertise across the
										technology spectrum.
									</p>
								</TabsContent>
							</Tabs>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

function TimelineItem({
	icon,
	title,
	organization,
	period,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	organization: string;
	period: string;
	description: string;
}) {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex gap-4">
					<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
						{icon}
					</div>
					<div className="space-y-1">
						<h4 className="font-bold">{title}</h4>
						<div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
							<span>{organization}</span>
							<span className="hidden sm:inline">•</span>
							<span className="flex items-center">
								<Calendar className="h-3 w-3 mr-1" />
								{period}
							</span>
						</div>
						<p className="text-sm text-muted-foreground mt-2">{description}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

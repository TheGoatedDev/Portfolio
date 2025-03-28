"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export function BasicContactSection() {
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
		<section id="contact" className="py-20">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
					>
						<div className="space-y-8">
							<motion.div variants={itemVariants}>
								<h3 className="text-2xl font-bold mb-6">Contact Information</h3>
								<p className="text-muted-foreground mb-8">
									Feel free to reach out through any of the following channels.
									I'm always open to discussing new projects, creative ideas, or
									opportunities to be part of your vision.
								</p>
							</motion.div>

							<motion.div variants={itemVariants} className="space-y-6">
								<ContactItem
									icon={<Mail className="h-5 w-5" />}
									title="Email"
									value="portfolio@login.thegoated.dev"
									href="mailto:portfolio@login.thegoated.dev"
								/>
								<ContactItem
									icon={<MapPin className="h-5 w-5" />}
									title="Location"
									value="United Kingdom"
									href="#"
								/>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

function ContactItem({
	icon,
	title,
	value,
	href,
}: {
	icon: React.ReactNode;
	title: string;
	value: string;
	href: string;
}) {
	return (
		<a
			href={href}
			className="flex items-start gap-4 group"
			target={
				href.startsWith("mailto:") || href.startsWith("tel:")
					? "_self"
					: "_blank"
			}
			rel="noopener noreferrer"
		>
			<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
				{icon}
			</div>
			<div>
				<h4 className="font-medium">{title}</h4>
				<p className="text-muted-foreground group-hover:text-primary transition-colors">
					{value}
				</p>
			</div>
		</a>
	);
}

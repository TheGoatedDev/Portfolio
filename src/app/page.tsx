import type { Metadata } from "next";
import type { Person, WebSite, WithContext } from "schema-dts";

import { AboutSection } from "@/components/about-section";
import { BasicContactSection } from "@/components/basic-contact-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";

export const metadata: Metadata = {
	title: "Home",
	description:
		"Thomas Burridge is a full-stack developer specializing in React, Next.js, and TypeScript. View projects, skills, and get in touch.",
	alternates: {
		canonical: "/",
	},
};

export default function Home() {
	const personSchema: WithContext<Person> = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Thomas Burridge",
		jobTitle: "Software Engineer",
		url: "https://thegoated.dev",
		sameAs: [
			"https://github.com/TheGoatedDev",
			"https://www.linkedin.com/in/thomas-nearlunar/",
		],
	};

	const websiteSchema: WithContext<WebSite> = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Thomas Burridge",
		url: "https://thegoated.dev",
		description:
			"Professional software engineer portfolio showcasing projects, skills, and technical expertise.",
	};

	return (
		<main className="min-h-screen">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data with XSS protection
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
				}}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data with XSS protection
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
				}}
			/>
			<HeroSection />
			<ProjectsSection />
			<SkillsSection />
			<AboutSection />
			<BasicContactSection />
			{/* <ContactSection /> */}
			<Footer />
		</main>
	);
}

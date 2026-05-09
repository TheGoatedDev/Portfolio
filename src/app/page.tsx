import type { Metadata } from "next";
import type { Person, WebSite, WithContext } from "schema-dts";

import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
	title: "Home",
	description:
		"Thomas Burridge builds infrastructure-heavy products: SaaS, IoT, multi-tenant systems. Selected work, working notes, contact.",
	alternates: {
		canonical: "/",
	},
};

export default function Home() {
	const personSchema: WithContext<Person> = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteConfig.identity.name,
		jobTitle: "Software Engineer",
		url: "https://thegoated.dev",
		email: `mailto:${siteConfig.contact.email}`,
		sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
	};

	const websiteSchema: WithContext<WebSite> = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.identity.name,
		url: "https://thegoated.dev",
		description:
			"Selected work, working notes, contact. Infrastructure-heavy products: SaaS, IoT, multi-tenant systems.",
	};

	return (
		<>
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

			<Header />
			<main>
				<HeroSection />
				<ProjectsSection />
				<AboutSection />
				<ContactSection />
			</main>
			<Footer />
		</>
	);
}

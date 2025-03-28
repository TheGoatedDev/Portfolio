import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<ProjectsSection />
			<SkillsSection />
			<AboutSection />
			{/* <ContactSection /> */}
			<Footer />
		</main>
	);
}

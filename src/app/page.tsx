import { AboutSection } from "@/components/about-section";
import { BasicContactSection } from "@/components/basic-contact-section";
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
			<BasicContactSection />
			{/* <ContactSection /> */}
			<Footer />
		</main>
	);
}

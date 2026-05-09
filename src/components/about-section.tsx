import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
	const { bio, identity } = siteConfig;

	return (
		<section
			id="about"
			aria-labelledby="about-heading"
			className="editorial-shell pt-16 pb-24 md:pt-24 md:pb-32 border-t border-border"
		>
			<div className="grid gap-10 md:grid-cols-12 md:gap-12 items-start">
				<div className="md:col-span-3 lg:col-span-3">
					<div className="relative h-32 w-32 md:h-44 md:w-44 overflow-hidden rounded-md grayscale">
						<Image
							src="/profile.jpeg"
							alt={`Portrait of ${identity.name}`}
							fill
							sizes="(min-width: 768px) 11rem, 8rem"
							className="object-cover"
						/>
					</div>
				</div>

				<div className="md:col-span-9 lg:col-span-8">
					<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
						About
					</p>
					<h2
						id="about-heading"
						className="mt-4 font-serif font-light tracking-tight text-foreground text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
					>
						A bit about how I work.
					</h2>

					<div className="mt-10 reading-column space-y-6 text-base md:text-lg text-foreground/85 leading-relaxed">
						<p>{bio.paragraphs[0]}</p>
						<p>{bio.paragraphs[1]}</p>

						<aside className="my-10 md:my-12">
							<p className="font-serif italic text-xl md:text-2xl font-light leading-snug text-foreground">
								{bio.roleHighlight}
							</p>
						</aside>

						<p>{bio.paragraphs[2]}</p>
					</div>
				</div>
			</div>
		</section>
	);
}

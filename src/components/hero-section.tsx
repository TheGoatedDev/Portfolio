import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
	const { availableForWork, identity } = siteConfig;

	return (
		<section className="editorial-shell pt-12 pb-20 md:pt-24 md:pb-28">
			<div className="reading-column">
				<AvailabilityPill available={availableForWork} />

				<h1 className="mt-8 font-serif font-light tracking-tight text-foreground text-[clamp(1.875rem,4.2vw,3.25rem)] leading-[1.15]">
					{identity.positioning}
				</h1>

				<p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-[48ch]">
					{identity.role}.
				</p>

				<div className="mt-12">
					<Link
						href="#contact"
						className="group inline-flex items-baseline gap-2 text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
					>
						<span className="border-b border-foreground/40 group-hover:border-primary transition-colors">
							Get in touch
						</span>
						<span
							aria-hidden="true"
							className="transition-transform group-hover:translate-x-0.5"
						>
							→
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}

function AvailabilityPill({ available }: { available: boolean }) {
	return (
		<div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
			<span className="relative inline-flex h-1.5 w-1.5 items-center justify-center text-foreground">
				{available && (
					<span
						aria-hidden="true"
						className="availability-ping absolute inset-0 rounded-full bg-foreground"
					/>
				)}
				<span
					aria-hidden="true"
					className={
						available
							? "relative h-1.5 w-1.5 rounded-full bg-foreground"
							: "relative h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
					}
				/>
			</span>
			<span>{available ? "Available for new work" : "Currently full"}</span>
		</div>
	);
}

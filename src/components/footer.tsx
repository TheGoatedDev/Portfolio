"use client";

import posthog from "posthog-js";

import { siteConfig } from "@/lib/site-config";

export function Footer() {
	const { identity, social } = siteConfig;
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border mt-12">
			<div className="editorial-shell py-10 md:py-14">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					<p className="text-sm text-muted-foreground">
						<span>
							© {year} {identity.name}
						</span>
						<span aria-hidden="true" className="mx-2 text-border">
							·
						</span>
						<span>{identity.location}</span>
					</p>

					<nav
						aria-label="Footer"
						className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
					>
						<FooterLink href={social.github} external profile="github">
							GitHub
						</FooterLink>
						<FooterLink href={social.linkedin} external profile="linkedin">
							LinkedIn
						</FooterLink>
						<FooterLink href="/api/cv/pdf" download>
							CV
						</FooterLink>
					</nav>
				</div>
			</div>
		</footer>
	);
}

function FooterLink({
	href,
	external,
	download,
	profile,
	children,
}: {
	href: string;
	external?: boolean;
	download?: boolean;
	profile?: "github" | "linkedin";
	children: React.ReactNode;
}) {
	const handleClick = () => {
		if (profile) {
			posthog.capture("social_profile_clicked", { profile });
			return;
		}

		posthog.capture("cv_download_requested");
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			{...(download ? { download: true } : {})}
			className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
		>
			{children}
		</a>
	);
}

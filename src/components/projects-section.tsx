import Image from "next/image";
import Link from "next/link";

import { type Project, siteConfig } from "@/lib/site-config";

export function ProjectsSection() {
	const { featuredWork, otherWork } = siteConfig;
	const [hero, ...rest] = featuredWork;

	return (
		<section
			id="work"
			aria-labelledby="work-heading"
			className="editorial-shell pt-16 pb-24 md:pt-24 md:pb-32"
		>
			<SectionOpener
				eyebrow="Selected work"
				headingId="work-heading"
				title="Things I've shipped, and what they did."
			/>

			<HeroEntry project={hero} />

			<ol className="mt-20 md:mt-28 divide-y divide-border">
				{rest.map((project) => (
					<li key={project.id}>
						<TextEntry project={project} />
					</li>
				))}
			</ol>

			{otherWork.length > 0 && <OtherWork projects={otherWork} />}
		</section>
	);
}

function SectionOpener({
	eyebrow,
	title,
	headingId,
}: {
	eyebrow: string;
	title: string;
	headingId?: string;
}) {
	return (
		<div className="reading-column mb-16 md:mb-20">
			<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
				{eyebrow}
			</p>
			<h2
				id={headingId}
				className="mt-4 font-serif font-light tracking-tight text-foreground text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
			>
				{title}
			</h2>
		</div>
	);
}

function HeroEntry({ project }: { project: Project }) {
	return (
		<article className="grid gap-10 md:grid-cols-12 md:gap-12 items-start">
			<div className="md:col-span-5 lg:col-span-5 md:order-2">
				{project.image ? (
					<div className="relative aspect-[5/4] overflow-hidden rounded-md bg-surface-lift border border-border/60">
						<Image
							src={project.image}
							alt={`${project.title} screenshot`}
							fill
							sizes="(min-width: 768px) 40vw, 100vw"
							className="object-cover"
							priority
						/>
					</div>
				) : null}
			</div>

			<div className="md:col-span-7 lg:col-span-7 md:order-1">
				<EntryNumber value={project.number} />
				<h3 className="mt-3 font-serif font-light tracking-tight text-foreground text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
					{project.title}
				</h3>
				<p className="mt-5 text-lg text-foreground/85 leading-snug max-w-[42ch]">
					{project.problem}
				</p>
				<p className="mt-3 text-lg text-muted-foreground leading-snug max-w-[42ch]">
					{project.outcome}
				</p>
				<EntryMeta project={project} />
				<EntryLinks project={project} className="mt-6" />
			</div>
		</article>
	);
}

function TextEntry({ project }: { project: Project }) {
	return (
		<article className="py-10 md:py-12">
			<div className="grid md:grid-cols-12 gap-6">
				<div className="md:col-span-2">
					<EntryNumber value={project.number} />
				</div>
				<div className="md:col-span-10 reading-column">
					<h3 className="font-serif font-light tracking-tight text-foreground text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15]">
						{project.title}
					</h3>
					<p className="mt-3 text-base md:text-lg text-foreground/85 leading-snug">
						{project.problem}
					</p>
					<p className="mt-2 text-base md:text-lg text-muted-foreground leading-snug">
						{project.outcome}
					</p>
					<EntryMeta project={project} />
					<EntryLinks project={project} className="mt-5" />
				</div>
			</div>
		</article>
	);
}

function EntryNumber({ value }: { value?: string }) {
	if (!value) return null;
	return (
		<span className="font-mono text-xs tracking-widest text-muted-foreground">
			{value}
		</span>
	);
}

function EntryMeta({ project }: { project: Project }) {
	const parts: string[] = [];
	if (project.year) parts.push(project.year);
	if (project.role) parts.push(project.role);
	if (project.stack.length > 0) parts.push(project.stack.join(", "));
	if (parts.length === 0) return null;

	return (
		<p className="mt-5 text-sm text-muted-foreground leading-relaxed">
			{parts.map((part, i) => (
				<span key={part}>
					{part}
					{i < parts.length - 1 ? (
						<span aria-hidden="true" className="mx-2.5 text-border">
							·
						</span>
					) : null}
				</span>
			))}
		</p>
	);
}

function EntryLinks({
	project,
	className,
}: {
	project: Project;
	className?: string;
}) {
	if (!project.liveUrl && !project.githubUrl) return null;
	return (
		<div
			className={`flex flex-wrap gap-x-6 gap-y-2 text-sm ${className ?? ""}`}
		>
			{project.liveUrl && (
				<ExternalTextLink href={project.liveUrl} label="Visit" />
			)}
			{project.githubUrl && (
				<ExternalTextLink href={project.githubUrl} label="Code" />
			)}
		</div>
	);
}

function ExternalTextLink({ href, label }: { href: string; label: string }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group inline-flex items-baseline gap-1.5 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
		>
			<span className="border-b border-foreground/30 group-hover:border-primary transition-colors">
				{label}
			</span>
			<span aria-hidden="true" className="text-xs">
				↗
			</span>
		</a>
	);
}

function OtherWork({ projects }: { projects: Project[] }) {
	return (
		<div className="mt-24 md:mt-32 pt-12 md:pt-16 border-t border-border">
			<div className="reading-column mb-10">
				<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
					Other work
				</p>
				<h3 className="mt-4 font-serif font-light tracking-tight text-foreground text-2xl md:text-3xl leading-[1.15]">
					A short list of the rest.
				</h3>
			</div>

			<dl className="grid gap-x-10 gap-y-7 md:grid-cols-2">
				{projects.map((project) => (
					<div key={project.id} className="grid grid-cols-[auto,1fr] gap-x-4">
						<dt className="font-mono text-xs tracking-widest text-muted-foreground pt-1.5">
							{project.year ?? ""}
						</dt>
						<dd className="text-base text-foreground/90 leading-snug">
							<span className="font-medium">{project.title}.</span>{" "}
							<span className="text-muted-foreground">{project.outcome}</span>{" "}
							{(project.liveUrl || project.githubUrl) && (
								<span className="inline-flex flex-wrap gap-x-3 gap-y-1 ml-1 text-sm">
									{project.liveUrl && (
										<InlineLink href={project.liveUrl} label="Visit" />
									)}
									{project.githubUrl && (
										<InlineLink href={project.githubUrl} label="Code" />
									)}
								</span>
							)}
						</dd>
					</div>
				))}
			</dl>

			<p className="mt-12 text-sm text-muted-foreground">
				More on{" "}
				<a
					href="https://github.com/TheGoatedDev"
					target="_blank"
					rel="noopener noreferrer"
					className="text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors"
				>
					GitHub
				</a>
				.
			</p>
		</div>
	);
}

function InlineLink({ href, label }: { href: string; label: string }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors"
		>
			{label}
		</a>
	);
}

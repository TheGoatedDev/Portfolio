import type { Metadata } from "next";
import Link from "next/link";

import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AvailabilityPill } from "@/components/hero-section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
	title: "Contract Software Engineer — UK, Remote Worldwide",
	description:
		"Contract software engineering built to be handed over: your accounts from day one, a mainstream stack, docs, tests, infrastructure as code, and a proper handover.",
	alternates: {
		canonical: "/contracting",
	},
};

type Offer = (typeof siteConfig.contracting.offers)[number];

export default function ContractingPage() {
	return (
		<>
			<Header />
			<main>
				<Intro />
				<Offers />
				<Promises />
				<Terms />
				<ContactSection source="contracting" />
			</main>
			<Footer />
		</>
	);
}

function Intro() {
	return (
		<section className="editorial-shell pt-12 pb-20 md:pt-24 md:pb-28">
			<AvailabilityPill available={siteConfig.availableForWork} />

			<h1 className="mt-8 font-serif font-light tracking-[-0.03em] text-foreground text-[clamp(2.75rem,8vw,6rem)] leading-[0.98] text-balance">
				Built to be handed over.
			</h1>
			<p className="mt-6 font-serif italic font-light text-muted-foreground text-[clamp(1.375rem,2.6vw,2rem)] leading-snug">
				You own everything, from day one.
			</p>

			<p className="mt-10 reading-column text-base md:text-lg text-foreground/85 leading-relaxed">
				I take on contract work for founders and small teams. What I build is
				meant to outlive the engagement: it runs in your accounts, on a stack
				any engineer knows, and it is documented well enough that you never need
				to call me back.
			</p>

			<div className="mt-12">
				<Link
					href="#contact"
					className="group inline-flex items-baseline gap-2 text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
				>
					<span className="border-b border-foreground/40 group-hover:border-primary transition-colors">
						Start a contract enquiry
					</span>
					<span
						aria-hidden="true"
						className="transition-transform group-hover:translate-x-0.5"
					>
						→
					</span>
				</Link>
			</div>
		</section>
	);
}

function Offers() {
	return (
		<section
			aria-labelledby="offers-heading"
			className="editorial-shell pt-16 pb-24 md:pt-24 md:pb-32 border-t border-border"
		>
			<h2
				id="offers-heading"
				className="font-serif font-light tracking-tight text-foreground text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
			>
				Three ways to start.
			</h2>

			<ul className="mt-14 md:mt-20 divide-y divide-border border-y border-border">
				{siteConfig.contracting.offers.map((offer) => (
					<li key={offer.id}>
						<OfferRow offer={offer} />
					</li>
				))}
			</ul>
		</section>
	);
}

function OfferRow({ offer }: { offer: Offer }) {
	return (
		<article className="grid gap-8 md:grid-cols-12 md:gap-12 py-12 md:py-16">
			<div className="md:col-span-4">
				<h3 className="font-serif font-light tracking-tight text-foreground text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.05]">
					{offer.title}
				</h3>
				<p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-[34ch]">
					{offer.summary}
				</p>
			</div>

			<div className="md:col-span-8">
				<dl className="grid gap-y-6 sm:grid-cols-[8.5rem_1fr] sm:gap-x-8">
					<OfferTerm label="For">{offer.forWho}</OfferTerm>
					<OfferTerm label="You get">{offer.youGet}</OfferTerm>
					<OfferTerm label="It ends with">{offer.endsWith}</OfferTerm>
				</dl>

				{"testimonial" in offer && (
					<figure className="mt-12 sm:ml-[calc(8.5rem+2rem)] pt-8 border-t border-border">
						<blockquote className="font-serif italic font-light text-xl md:text-2xl leading-snug text-foreground">
							“{offer.testimonial.quote}”
						</blockquote>
						<figcaption className="mt-4 text-sm text-muted-foreground leading-relaxed">
							<a
								href={offer.testimonial.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							>
								{offer.testimonial.name}
							</a>
							, {offer.testimonial.title}. {offer.testimonial.context}.
						</figcaption>
					</figure>
				)}
			</div>
		</article>
	);
}

function OfferTerm({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="grid gap-1.5 sm:contents">
			<dt className="text-sm text-muted-foreground sm:pt-0.5">{label}</dt>
			<dd className="text-base md:text-lg text-foreground/90 leading-relaxed max-w-[60ch]">
				{children}
			</dd>
		</div>
	);
}

function Promises() {
	const { promises } = siteConfig.contracting;

	return (
		<section
			aria-labelledby="promises-heading"
			className="editorial-shell pt-16 pb-24 md:pt-24 md:pb-32"
		>
			<div className="grid gap-12 md:grid-cols-12 md:gap-12">
				<div className="md:col-span-4">
					<div className="md:sticky md:top-28">
						<h2
							id="promises-heading"
							className="font-serif font-light tracking-tight text-foreground text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] text-balance"
						>
							Every engagement ends the same way.
						</h2>
						<p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-[34ch]">
							Whichever way we start, these hold. They run in order, from the
							first day to the last.
						</p>
					</div>
				</div>

				<div className="md:col-span-8">
					<ol className="space-y-10 md:space-y-12">
						{promises.map((promise, index) => (
							<li
								key={promise.title}
								className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_1fr] gap-x-4"
							>
								<span
									aria-hidden="true"
									className="font-serif font-light text-2xl md:text-3xl leading-none text-muted-foreground tabular-nums pt-0.5"
								>
									{index + 1}
								</span>
								<div>
									<h3 className="text-lg md:text-xl font-medium text-foreground leading-snug">
										{promise.title}
									</h3>
									<p className="mt-2 text-base md:text-lg text-muted-foreground leading-relaxed max-w-[56ch]">
										{promise.body}
									</p>
								</div>
							</li>
						))}
					</ol>

					<p className="mt-16 md:mt-20 pt-10 border-t border-border font-serif italic font-light text-foreground text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1]">
						After that, nothing depends on me.
					</p>
				</div>
			</div>
		</section>
	);
}

function Terms() {
	return (
		<section
			aria-labelledby="terms-heading"
			className="editorial-shell pt-16 pb-24 md:pt-24 md:pb-32 border-t border-border"
		>
			<div className="grid gap-10 md:grid-cols-12 md:gap-12">
				<h2
					id="terms-heading"
					className="md:col-span-4 font-serif font-light tracking-tight text-foreground text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]"
				>
					The practical bits.
				</h2>

				<dl className="md:col-span-8 divide-y divide-border border-y border-border">
					{siteConfig.contracting.terms.map((term) => (
						<div
							key={term.label}
							className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-x-8 py-5"
						>
							<dt className="text-sm text-muted-foreground sm:pt-0.5">
								{term.label}
							</dt>
							<dd className="text-base md:text-lg text-foreground/90 leading-relaxed">
								{term.value}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}

"use client";

import Script from "next/script";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { sendContactMessage } from "@/app/actions/contact";
import { type ContactState, initialContactState } from "@/lib/contact-types";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
	const [state, formAction] = useActionState(
		sendContactMessage,
		initialContactState,
	);
	const { contact } = siteConfig;

	return (
		<section
			id="contact"
			aria-labelledby="contact-heading"
			className="editorial-shell pt-16 pb-24 md:pt-24 md:pb-32 border-t border-border"
		>
			<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
				Contact
			</p>

			<h2
				id="contact-heading"
				className="mt-4 font-serif font-light tracking-tight text-foreground text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.05] break-words"
			>
				<a
					href={`mailto:${contact.email}`}
					className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
				>
					{contact.email}
				</a>
			</h2>

			<p className="mt-6 reading-column text-base md:text-lg text-muted-foreground leading-relaxed">
				Working on something? Send a short message below, or email the address
				above. {contact.responseWindow}
			</p>

			<div className="mt-12 max-w-xl">
				{state.status === "success" ? (
					<SuccessNote message={state.message} />
				) : (
					<ContactForm formAction={formAction} state={state} />
				)}
			</div>
		</section>
	);
}

function ContactForm({
	formAction,
	state,
}: {
	formAction: (formData: FormData) => void;
	state: ContactState;
}) {
	const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
	const previous =
		state.status === "error" && state.values
			? state.values
			: { name: "", email: "", message: "" };

	return (
		<form action={formAction} noValidate className="space-y-6">
			{turnstileSiteKey && (
				<Script
					src="https://challenges.cloudflare.com/turnstile/v0/api.js"
					strategy="afterInteractive"
				/>
			)}
			<input
				type="text"
				name="company"
				tabIndex={-1}
				autoComplete="off"
				className="absolute left-[-9999px] h-0 w-0 opacity-0"
				aria-hidden="true"
			/>

			<Field
				name="name"
				label="Your name"
				type="text"
				autoComplete="name"
				defaultValue={previous.name}
				required
			/>
			<Field
				name="email"
				label="Email"
				type="email"
				autoComplete="email"
				defaultValue={previous.email}
				required
			/>
			<TextareaField
				name="message"
				label="Tell me about the project"
				placeholder="What you're building, who it's for, rough timeline."
				defaultValue={previous.message}
				required
			/>
			{turnstileSiteKey && (
				<div
					className="cf-turnstile min-h-[65px]"
					data-sitekey={turnstileSiteKey}
				/>
			)}

			{state.status === "error" && (
				<p role="alert" className="text-sm text-destructive leading-snug">
					{state.error}
				</p>
			)}

			<SubmitButton />
		</form>
	);
}

function Field({
	name,
	label,
	type,
	autoComplete,
	defaultValue,
	required,
}: {
	name: string;
	label: string;
	type: string;
	autoComplete?: string;
	defaultValue?: string;
	required?: boolean;
}) {
	return (
		<label className="block">
			<span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">
				{label}
			</span>
			<input
				name={name}
				type={type}
				autoComplete={autoComplete}
				defaultValue={defaultValue}
				required={required}
				className="w-full bg-transparent border-b border-border pb-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
			/>
		</label>
	);
}

function TextareaField({
	name,
	label,
	placeholder,
	defaultValue,
	required,
}: {
	name: string;
	label: string;
	placeholder?: string;
	defaultValue?: string;
	required?: boolean;
}) {
	return (
		<label className="block">
			<span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">
				{label}
			</span>
			<textarea
				name={name}
				rows={5}
				placeholder={placeholder}
				defaultValue={defaultValue}
				required={required}
				className="w-full bg-transparent border-b border-border pb-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors resize-y"
			/>
		</label>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
		>
			{pending ? "Sending…" : "Send message"}
			{!pending && (
				<span aria-hidden="true" className="text-base">
					→
				</span>
			)}
		</button>
	);
}

function SuccessNote({ message }: { message: string }) {
	return (
		<output className="block space-y-3 text-base text-foreground leading-relaxed">
			<p className="font-serif italic text-xl font-light">{message}</p>
			<p className="text-muted-foreground text-sm">
				If you do not hear from me, check your spam folder or email me directly.
			</p>
		</output>
	);
}

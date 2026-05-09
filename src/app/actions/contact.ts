"use server";

import type { ContactState } from "@/lib/contact-types";
import { siteConfig } from "@/lib/site-config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /https?:\/\//gi;
const CONTROL_CHAR_RE = new RegExp(
	"[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f\\u007f]",
);
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 3;
const TURNSTILE_SITEVERIFY_URL =
	"https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ERROR =
	"Could not verify the anti-spam check. Please try again, or email me directly at";

type RateLimitEntry = {
	count: number;
	resetAt: number;
};

const rateLimits = new Map<string, RateLimitEntry>();

export async function sendContactMessage(
	_previous: ContactState,
	formData: FormData,
): Promise<ContactState> {
	const name = String(formData.get("name") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();
	const honeypot = String(formData.get("company") ?? "").trim();
	const turnstileToken = String(
		formData.get("cf-turnstile-response") ?? "",
	).trim();

	const values = { name, email, message };

	if (honeypot) {
		return {
			status: "success",
			message: "Got it. I'll reply within ~24 hours.",
		};
	}

	if (!name || !email || !message) {
		return {
			status: "error",
			error: "Please fill in every field.",
			values,
		};
	}
	if (name.length > MAX_NAME_LENGTH) {
		return {
			status: "error",
			error: "Your name is a little too long.",
			values,
		};
	}
	if (email.length > MAX_EMAIL_LENGTH) {
		return {
			status: "error",
			error: "That email address is too long.",
			values,
		};
	}
	if (!EMAIL_RE.test(email)) {
		return {
			status: "error",
			error: "That email address looks off. Could you double-check?",
			values,
		};
	}
	if (message.length < 10) {
		return {
			status: "error",
			error:
				"A short context line helps me reply usefully. At least 10 characters.",
			values,
		};
	}
	if (message.length > MAX_MESSAGE_LENGTH) {
		return {
			status: "error",
			error: "That message is too long. Please keep it under 4000 characters.",
			values,
		};
	}
	if (CONTROL_CHAR_RE.test(`${name}${email}${message}`)) {
		return {
			status: "error",
			error: "Please remove unsupported characters and try again.",
			values,
		};
	}
	if ((message.match(URL_RE) ?? []).length > 3) {
		return {
			status: "error",
			error: "Please keep links to a minimum.",
			values,
		};
	}

	if (!consumeRateLimit(email.toLowerCase())) {
		return {
			status: "error",
			error: "Too many attempts. Please wait a few minutes and try again.",
			values,
		};
	}

	const turnstile = await verifyTurnstileToken(turnstileToken);
	if (!turnstile.ok) {
		if (turnstile.reason === "config") {
			console.error("[contact] Turnstile is not configured for production");
			return {
				status: "error",
				error: `The form is not configured to send mail right now. You can email me directly at ${siteConfig.contact.email}.`,
				values,
			};
		}

		return {
			status: "error",
			error: `${TURNSTILE_ERROR} ${siteConfig.contact.email}.`,
			values,
		};
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error("[contact] RESEND_API_KEY is not set");
		return {
			status: "error",
			error: `The form is not configured to send mail right now. You can email me directly at ${siteConfig.contact.email}.`,
			values,
		};
	}

	const fromAddress =
		process.env.RESEND_FROM_ADDRESS ?? "Portfolio <portfolio@thegoated.dev>";
	const toAddress = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;

	try {
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: fromAddress,
				to: [toAddress],
				reply_to: email,
				subject: `New message from ${name} via portfolio`,
				text: [`From: ${name} <${email}>`, "", message].join("\n"),
			}),
		});

		if (!response.ok) {
			const detail = await response.text().catch(() => "");
			console.error("[contact] resend error", response.status, detail);
			return {
				status: "error",
				error: `Something went wrong sending the message. Please try again, or email me directly at ${siteConfig.contact.email}.`,
				values,
			};
		}

		return {
			status: "success",
			message: "Got it. I'll reply within ~24 hours.",
		};
	} catch (err) {
		console.error("[contact] send failed", err);
		return {
			status: "error",
			error: `Network error. Please try again, or email me directly at ${siteConfig.contact.email}.`,
			values,
		};
	}
}

function consumeRateLimit(key: string): boolean {
	const now = Date.now();

	for (const [entryKey, entry] of rateLimits) {
		if (entry.resetAt <= now) {
			rateLimits.delete(entryKey);
		}
	}

	const entry = rateLimits.get(key);
	if (!entry) {
		rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
		return true;
	}

	if (entry.count >= RATE_LIMIT_MAX_ATTEMPTS) {
		return false;
	}

	entry.count += 1;
	return true;
}

async function verifyTurnstileToken(
	token: string,
): Promise<{ ok: true } | { ok: false; reason: "config" | "verify" }> {
	const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
	const secretKey = process.env.TURNSTILE_SECRET_KEY;

	if (!siteKey || !secretKey) {
		if (process.env.NODE_ENV === "production") {
			return { ok: false, reason: "config" };
		}

		console.warn("[contact] Turnstile is not configured; skipping in dev");
		return { ok: true };
	}

	if (!token) {
		return { ok: false, reason: "verify" };
	}

	try {
		const body = new URLSearchParams({
			secret: secretKey,
			response: token,
		});
		const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body,
		});

		if (!response.ok) {
			console.error("[contact] turnstile error", response.status);
			return { ok: false, reason: "verify" };
		}

		const result = (await response.json().catch(() => null)) as
			| { success?: boolean }
			| null;

		return result?.success ? { ok: true } : { ok: false, reason: "verify" };
	} catch (err) {
		console.error("[contact] turnstile verify failed", err);
		return { ok: false, reason: "verify" };
	}
}

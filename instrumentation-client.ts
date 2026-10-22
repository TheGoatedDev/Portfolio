import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (!projectToken) {
	if (process.env.NODE_ENV === "development") {
		throw new Error(
			"NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
		);
	}
} else {
	posthog.init(projectToken, {
		// Proxied to EU PostHog via rewrites in next.config.ts
		api_host: "/relay",
		ui_host: "https://eu.posthog.com",
		defaults: "2026-01-30",
		capture_exceptions: true,
		debug: process.env.NODE_ENV === "development",
	});
}

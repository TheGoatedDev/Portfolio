import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	serverExternalPackages: ["@takumi-rs/image-response"],
	// PostHog reverse proxy (EU) so ad blockers don't drop client events
	async rewrites() {
		return [
			{
				source: "/relay/static/:path*",
				destination: "https://eu-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/relay/array/:path*",
				destination: "https://eu-assets.i.posthog.com/array/:path*",
			},
			{
				source: "/relay/:path*",
				destination: "https://eu.i.posthog.com/:path*",
			},
		];
	},
	// PostHog API endpoints use trailing slashes
	skipTrailingSlashRedirect: true,
};

export default nextConfig;

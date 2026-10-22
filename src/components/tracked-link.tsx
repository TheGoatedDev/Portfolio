"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function TrackedLink({
	href,
	event,
	className,
	children,
}: {
	href: string;
	event:
		| "hero_contact_cta_clicked"
		| "hero_contracting_cta_clicked"
		| "contracting_enquiry_cta_clicked";
	className: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className={className}
			onClick={() => posthog.capture(event)}
		>
			{children}
		</Link>
	);
}

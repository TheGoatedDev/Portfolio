export type Project = {
	id: string;
	number?: string;
	title: string;
	year?: string;
	role: string;
	problem: string;
	outcome: string;
	stack: string[];
	liveUrl?: string;
	githubUrl?: string;
	image?: string;
};

export const siteConfig = {
	availableForWork: true,

	identity: {
		name: "Thomas Burridge",
		location: "United Kingdom",
		role: "Lead engineer by day, freelancer by night",
		positioning:
			"I help founders ship infrastructure-heavy products: SaaS, IoT, multi-tenant systems.",
	},

	contact: {
		email: "hello@login.thegoated.dev",
		responseWindow: "I read everything and reply within ~24 hours.",
	},

	social: {
		github: "https://github.com/TheGoatedDev",
		linkedin: "https://www.linkedin.com/in/thomas-nearlunar/",
	},

	bio: {
		paragraphs: [
			"I'm Thomas, a software engineer based in the UK. I've been shipping production software for over six years, mostly on infrastructure-heavy products: SaaS platforms, IoT control systems, and multi-tenant tooling that has to keep running while teams sleep.",
			"I'm a Lead Software Engineer at Autonative, working in a growing engineering team on digital platforms that help vehicle manufacturers compete in a direct-to-customer era. Before that I led engineering and DevOps at a digital products company: full-stack Next.js and NestJS, multi-region Kubernetes, observability, and the cybersecurity remit that keeps those systems defensible as well as functional.",
			"Earlier I worked across cybersecurity at BT Group, IoT software at Prolectric, and a string of contract engagements as a freelancer. I hold CompTIA CySA+ and was previously GIAC GCIH certified. The throughline: I prefer building things that have to work for real people, on real infrastructure, for a long time.",
		],
		roleHighlight:
			"Lead Software Engineer at Autonative in a growing team. Automotive digital platforms, full-stack delivery, and production infrastructure.",
	},

	contracting: {
		offers: [
			{
				id: "build",
				title: "Build",
				summary:
					"A new product or a defined feature, from empty repo to production.",
				forWho:
					"Founders with a scoped idea and no engineering team yet, or a team that needs a fixed piece of work done.",
				youGet:
					"Working software, deployed in your own accounts, with the tests, CI, and docs the next engineer needs to carry on.",
				endsWith:
					"A walkthrough of the codebase and how to ship a change to it.",
			},
			{
				id: "rescue",
				title: "Rescue",
				summary:
					"An audit of an existing codebase, then the work to make it handover-ready.",
				forWho:
					"Teams running code nobody fully understands, or whose last contractor left with the knowledge.",
				youGet:
					"A plain list of what is risky and why, then the fixes in priority order: docs, tests, CI, and the worst of the tech debt.",
				endsWith:
					"A codebase a new hire can open on their first day, and a list of what's left.",
				testimonial: {
					quote:
						"Thomas demonstrated remarkable abilities in managing tech debt and optimizing applications.",
					name: "Vitor Oliveira",
					title: "Startup Engineering Leader",
					context: "Managed Thomas directly, 2023",
					href: "https://www.linkedin.com/in/thomas-nearlunar/details/recommendations/",
				},
			},
			{
				id: "infra",
				title: "Infrastructure",
				summary: "Environments, deploys, and CI, defined in code.",
				forWho:
					"Products that work, but are deployed by hand, by one person, from memory.",
				youGet:
					"Infrastructure as code, a CI pipeline, separate staging and production, and written steps for the routine jobs.",
				endsWith: "Anyone with access can rebuild or redeploy without me.",
			},
		],
		promises: [
			{
				title: "You create the accounts.",
				body: "Repos, cloud, domains, and secrets are in your name from day one. I'm invited in as a guest.",
			},
			{
				title: "The stack is mainstream.",
				body: "Tools most engineers already know, picked partly because they are easy to hire for. No in-house frameworks.",
			},
			{
				title: "The docs live with the code.",
				body: "Every repo has a README covering how to run, test, and deploy it. Short decision records explain the non-obvious choices, so nobody has to ask me why.",
			},
			{
				title: "Tests and CI run without me.",
				body: "Every change is checked automatically on your CI, not on my laptop.",
			},
			{
				title: "Infrastructure is code.",
				body: "Servers, databases, and environments are defined in files in your repo, and can be rebuilt from them.",
			},
			{
				title: "We do a proper handover.",
				body: "A live session or recorded walkthrough of the system, and how to change it safely.",
			},
			{
				title: "I remove my own access.",
				body: "At the end of the engagement I revoke my keys and accounts.",
			},
		],
		terms: [
			{ label: "Clients", value: "One at a time." },
			{
				label: "Hours",
				value: "Around 20 a week, evenings and weekends, UK time.",
			},
			{
				label: "Where",
				value: "Remote, worldwide. UK evenings overlap US working hours.",
			},
			{ label: "Replies", value: "Within 24 hours." },
			{ label: "Pricing", value: "Scoped and quoted after a first call." },
		],
	},

	featuredWork: [
		{
			id: "hetzner-cloud-radar",
			number: "01",
			title: "Hetzner Cloud Radar",
			year: "2026",
			role: "Personal project",
			problem:
				"Hetzner Cloud capacity is chronically sold out, but availability shifts by the minute and the official dashboard only shows the current state.",
			outcome:
				"An independent radar that polls the Hetzner Cloud API every 60 seconds, tracks every restock and sellout across each region, and publishes a running dispatch feed with email subscriptions.",
			stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Resend"],
			liveUrl: "https://hetzner.thegoated.dev/",
			githubUrl: "https://github.com/TheGoatedDev/Hetzner-Cloud-Radar",
			image: "/projects/hetzner-cloud-radar.png",
		},
		{
			id: "nearirm",
			number: "02",
			title: "NearIRM",
			year: "2024 — present",
			role: "Founder and lead engineer",
			problem:
				"Small engineering teams need on-call routing without paying enterprise prices or stitching together half a dozen tools.",
			outcome:
				"A multi-tenant incident management product. Alerts route through email, Slack, push, or webhooks with retry logic and delivery tracking, billed via Stripe.",
			stack: ["Next.js", "TypeScript", "tRPC", "MySQL", "Drizzle", "Stripe"],
			githubUrl: "https://github.com/TheGoatedDev/NearIRM",
		},
		{
			id: "powerportal",
			number: "03",
			title: "PowerPortal",
			year: "2022 — 2023",
			role: "Software engineer at Prolectric",
			problem:
				"Solar-diesel hybrid generators were deployed across remote sites with no real-time view of fuel, output, or faults.",
			outcome:
				"An IoT portal that ingests telemetry through AWS IoT Core, surfaces real-time monitoring and control, and pushes firmware updates to the field.",
			stack: [
				"Next.js",
				"AWS IoT",
				"TypeScript",
				"tRPC",
				"Socket.IO",
				"DynamoDB",
			],
			liveUrl: "https://power2.prolectric.co.uk",
		},
		{
			id: "webdashy",
			number: "04",
			title: "Webdashy",
			year: "2024",
			role: "Personal project",
			problem:
				"A dashcam that doesn't need a server, an app store, or a recurring fee.",
			outcome:
				"A browser-only dashcam: MediaPipe runs vehicle detection through your webcam, captures save locally, and adjustable crop regions tune what gets recorded.",
			stack: ["React", "TypeScript", "MediaPipe", "Vite"],
			githubUrl: "https://github.com/TheGoatedDev/Webdashy",
		},
		{
			id: "mirrorquay",
			number: "05",
			title: "MirrorQuay",
			year: "2023 — 2024",
			role: "Founder and engineer",
			problem:
				"Pulling Docker images across regions and registries is fragile, slow, and hard to audit.",
			outcome:
				"A registry mirroring service that proxies and caches between any two Docker registries, with cryptographic verification on the way through.",
			stack: ["Next.js", "TypeScript", "tRPC", "MySQL", "Docker"],
		},
		{
			id: "bitproxy",
			number: "06",
			title: "BitProxy",
			year: "2023",
			role: "Founder and engineer",
			problem:
				"Adding Bitcoin payments to an app means running infrastructure most teams don't want to own.",
			outcome:
				"An API and admin dashboard that handle Bitcoin payment processing on behalf of integrators, so they ship without standing up a node.",
			stack: ["Next.js", "TypeScript", "tRPC", "MySQL", "Bitcoin"],
		},
	] satisfies Project[],

	otherWork: [
		{
			id: "rescuecore",
			title: "RescueCore",
			year: "2024",
			role: "Founder",
			problem: "",
			outcome:
				"Animal shelter management for rescues: animals, volunteers, fosters, adopters.",
			stack: ["Next.js", "tRPC", "MySQL", "S3"],
		},
		{
			id: "gitruley",
			title: "GitRuley",
			year: "2024",
			role: "Personal project",
			problem: "",
			outcome:
				"A web app to mass-manage GitHub repository rules without standing up a database.",
			stack: ["React", "Next.js", "Tailwind"],
			githubUrl: "https://github.com/TheGoatedDev/gitruley",
		},
		{
			id: "all-the-infra",
			title: "All-The-Infra",
			year: "2023",
			role: "Personal project",
			problem: "",
			outcome:
				"A Docker Compose stack for local development: databases, queues, mail testing, and monitoring, pre-wired.",
			stack: ["Docker Compose"],
			githubUrl: "https://github.com/TheGoatedDev/All-The-Infra",
		},
		{
			id: "lighting-portal",
			title: "Lighting Portal",
			year: "2022 — 2023",
			role: "Software engineer at Prolectric",
			problem: "",
			outcome:
				"Refactor of a control web app for solar lighting towers: real-time monitoring, control, and energy tracking.",
			stack: ["AWS", "Node.js", "Socket.IO", "DynamoDB"],
			liveUrl: "https://lighting.prolectric.co.uk",
		},
		{
			id: "enterprisenest",
			title: "EnterpriseNest",
			year: "2023",
			role: "Personal project",
			problem: "",
			outcome:
				"A NestJS framework opinionated around DDD, onion, and hexagonal architectures.",
			stack: ["NestJS", "TypeScript", "Docker"],
			githubUrl: "https://github.com/TheGoatedDev/EnterpriseNest",
		},
		{
			id: "data-warehouse",
			title: "Data Warehouse",
			year: "2023",
			role: "Personal project",
			problem: "",
			outcome: "A low-cost cloud file store on S3, no database overhead.",
			stack: ["AWS S3", "Next.js", "TypeScript"],
			githubUrl: "https://github.com/TheGoatedDev/Data-Warehouse",
		},
	] satisfies Project[],
} as const;

export type SiteConfig = typeof siteConfig;

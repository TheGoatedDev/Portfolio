export type TemplateVariableValue = string | number;
export type TemplateVariables = Record<string, TemplateVariableValue>;

export type CvDateRange = {
	startDate: Date;
	endDate?: Date;
};

export type CvExperience = CvDateRange & {
	role: string;
	company: string;
	highlights: string[];
};

export type CvEducation = CvDateRange & {
	qualification: string;
	institution: string;
	details?: string;
};

export type CvSkillGroup = {
	category: string;
	skills: string[];
};

export type CvData = {
	name: string;
	title: string;
	location: string;
	email: string;
	website: string;
	links: string[];
	summary: string[];
	experience: CvExperience[];
	skills: CvSkillGroup[];
	education: CvEducation[];
};

const TEMPLATE_VARIABLE_PATTERN = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;

const CV_TEMPLATE: CvData = {
	name: "Thomas Burridge",
	title: "{{currentTitle}}",
	location: "{{location}}",
	email: "thomas@thegoated.dev",
	website: "https://thegoated.dev",
	links: [
		"https://github.com/TheGoatedDev",
		"https://www.linkedin.com/in/thomas-nearlunar/",
	],
	summary: [
		"Full-stack engineer with {{yearsExperiencePlus}} years of experience delivering secure, scalable web platforms and cloud-native infrastructure.",
		"Hands-on across React, Next.js, TypeScript, Node.js, and {{preferredCloud}} with strong emphasis on DevOps automation and resilient architecture.",
		"Experienced leading technical teams, shipping production systems, and combining product delivery with cybersecurity best practices.",
	],
	experience: [
		{
			role: "Lead Software Engineer and DevOps Lead",
			company: "Propriotec LTD",
			startDate: new Date("2024-04-01T00:00:00.000Z"),
			highlights: [
				"Architected full-stack applications with Next.js, React, NestJS, PostgreSQL, and MongoDB.",
				"Managed multi-region Kubernetes deployments and improved observability with Grafana.",
				"Led delivery standards for {{platformFocus}}, release pipelines, and platform reliability.",
			],
		},
		{
			role: "Cyber Security Analyst",
			company: "Propriotec LTD",
			startDate: new Date("2024-06-01T00:00:00.000Z"),
			highlights: [
				"Owned SIEM and endpoint security operations across cloud and endpoint environments.",
				"Conducted security audits and implemented operational controls aligned to certification goals.",
			],
		},
		{
			role: "Director and Senior Software Engineer",
			company: "NearLunar",
			startDate: new Date("2023-05-01T00:00:00.000Z"),
			endDate: new Date("2025-01-01T00:00:00.000Z"),
			highlights: [
				"Led engineering teams and technical strategy across multiple client engagements.",
				"Defined architecture standards while balancing delivery pace and quality.",
			],
		},
		{
			role: "Senior Full Stack Engineer (Contract)",
			company: "Codeti Studio",
			startDate: new Date("2023-08-01T00:00:00.000Z"),
			endDate: new Date("2023-11-01T00:00:00.000Z"),
			highlights: [
				"Built platform features for gaming workflows using React, Next.js, TypeScript, and Tailwind CSS.",
				"Implemented data-heavy UI experiences and state management patterns for scale.",
			],
		},
		{
			role: "Senior Software Engineer (Contract)",
			company: "Collide Digital Media",
			startDate: new Date("2023-06-01T00:00:00.000Z"),
			endDate: new Date("2024-01-01T00:00:00.000Z"),
			highlights: [
				"Developed production APIs in Node.js and Express with TypeScript.",
				"Led MongoDB to PostgreSQL migration and shipped AWS integrations across S3, Cognito, and SES.",
			],
		},
		{
			role: "Software Engineer",
			company: "Prolectric Ltd",
			startDate: new Date("2022-09-01T00:00:00.000Z"),
			endDate: new Date("2023-08-01T00:00:00.000Z"),
			highlights: [
				"Delivered IoT monitoring and control software for hybrid energy systems.",
				"Collaborated with hardware teams to integrate telemetry and real-time control paths.",
			],
		},
		{
			role: "Cyber Security Analyst",
			company: "BT Group",
			startDate: new Date("2020-09-01T00:00:00.000Z"),
			endDate: new Date("2022-10-01T00:00:00.000Z"),
			highlights: [
				"Supported network security operations, IDS workflows, and defensive automation.",
				"Partnered with cross-functional stakeholders on operational security improvements.",
			],
		},
		{
			role: "Freelance Software Engineer",
			company: "Various Clients",
			startDate: new Date("2020-01-01T00:00:00.000Z"),
			endDate: new Date("2023-05-01T00:00:00.000Z"),
			highlights: [
				"Delivered full-stack solutions for startups and SMEs using modern JavaScript stacks.",
				"Worked directly with clients to scope, implement, and launch production-ready systems.",
			],
		},
	],
	skills: [
		{
			category: "Frontend",
			skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
		},
		{
			category: "Backend",
			skills: ["Node.js", "Express", "NestJS", "WebSockets", "REST APIs"],
		},
		{
			category: "Cloud and DevOps",
			skills: [
				"{{preferredCloud}}",
				"Kubernetes",
				"Docker",
				"CI/CD",
				"Infrastructure as Code",
				"Observability",
			],
		},
		{
			category: "Data and Security",
			skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Cybersecurity"],
		},
	],
	education: [
		{
			qualification:
				"Computing and Software Development Extended Diploma (BTEC Level 3)",
			institution: "Bridgwater and Taunton College",
			startDate: new Date("2019-09-01T00:00:00.000Z"),
			endDate: new Date("2020-06-01T00:00:00.000Z"),
			details: "Grade achieved: D*D*D*",
		},
		{
			qualification: "CompTIA CySA+",
			institution: "CompTIA",
			startDate: new Date("2022-05-01T00:00:00.000Z"),
		},
		{
			qualification: "GIAC Certified Incident Handler (GCIH)",
			institution: "GIAC Certifications",
			startDate: new Date("2020-10-01T00:00:00.000Z"),
		},
	],
};

const getYearsSince = (startDate: Date, referenceDate = new Date()) => {
	let years = referenceDate.getUTCFullYear() - startDate.getUTCFullYear();
	const hasNotReachedAnniversary =
		referenceDate.getUTCMonth() < startDate.getUTCMonth() ||
		(referenceDate.getUTCMonth() === startDate.getUTCMonth() &&
			referenceDate.getUTCDate() < startDate.getUTCDate());

	if (hasNotReachedAnniversary) {
		years -= 1;
	}

	return Math.max(0, years);
};

const getEarliestExperienceStartDate = (experience: CvExperience[]) => {
	if (experience.length === 0) {
		return new Date();
	}

	return experience.reduce(
		(earliest, entry) =>
			entry.startDate < earliest ? entry.startDate : earliest,
		experience[0].startDate,
	);
};

const getDefaultTemplateVariables = (): TemplateVariables => {
	const earliestExperienceStartDate = getEarliestExperienceStartDate(
		CV_TEMPLATE.experience,
	);

	return {
		currentTitle: "Lead Software Engineer and DevOps Lead",
		location: "United Kingdom",
		preferredCloud: "AWS",
		platformFocus: "scalable digital products",
		yearsExperiencePlus: `${getYearsSince(earliestExperienceStartDate)}+`,
	};
};

const renderTemplateString = (value: string, variables: TemplateVariables) =>
	value.replace(TEMPLATE_VARIABLE_PATTERN, (fullMatch, variableName: string) => {
		const replacement = variables[variableName];
		if (replacement === undefined) {
			return fullMatch;
		}
		return String(replacement);
	});

const renderTemplateValue = <T>(
	value: T,
	variables: TemplateVariables,
): T => {
	if (typeof value === "string") {
		return renderTemplateString(value, variables) as T;
	}

	if (value instanceof Date) {
		return new Date(value.getTime()) as T;
	}

	if (Array.isArray(value)) {
		return value.map((item) => renderTemplateValue(item, variables)) as T;
	}

	if (value && typeof value === "object") {
		const renderedEntries = Object.entries(value).map(([key, entryValue]) => [
			key,
			renderTemplateValue(entryValue, variables),
		]);
		return Object.fromEntries(renderedEntries) as T;
	}

	return value;
};

export const buildCvData = (variableOverrides: TemplateVariables = {}): CvData => {
	const templateVariables = {
		...getDefaultTemplateVariables(),
		...variableOverrides,
	};

	return renderTemplateValue(CV_TEMPLATE, templateVariables);
};

export const CV_DATA = buildCvData();

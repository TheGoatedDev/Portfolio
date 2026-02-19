import { buildCvData, type TemplateVariables } from "@/lib/cv-data";
import { generateCvPdf } from "@/lib/cv-pdf";
import { unstable_cache } from "next/cache";

export const runtime = "nodejs";

const CV_PDF_CACHE_SECONDS = 60 * 60 * 24;
const NUMBER_PATTERN = /^-?\d+(\.\d+)?$/;

const getCachedCvPdfBase64 = unstable_cache(
	async (serializedVariables: string) => {
		const variables = parseSerializedVariables(serializedVariables);
		const pdfBytes = await generateCvPdf(buildCvData(variables));
		return Buffer.from(pdfBytes).toString("base64");
	},
	["cv-pdf-v2"],
	{
		revalidate: CV_PDF_CACHE_SECONDS,
		tags: ["cv-pdf"],
	},
);

const parseSerializedVariables = (
	serializedVariables: string,
): TemplateVariables => {
	if (!serializedVariables) {
		return {};
	}

	try {
		return JSON.parse(serializedVariables) as TemplateVariables;
	} catch {
		return {};
	}
};

const parseTemplateVariables = (
	searchParams: URLSearchParams,
): TemplateVariables => {
	const variables: TemplateVariables = {};

	for (const [key, rawValue] of searchParams.entries()) {
		const value = rawValue.trim();
		if (!value) {
			continue;
		}

		if (NUMBER_PATTERN.test(value)) {
			const asNumber = Number(value);
			variables[key] = Number.isFinite(asNumber) ? asNumber : value;
			continue;
		}

		variables[key] = value;
	}

	return variables;
};

const stableSerializeVariables = (variables: TemplateVariables) => {
	const sortedEntries = Object.entries(variables).sort(([a], [b]) =>
		a.localeCompare(b),
	);
	return JSON.stringify(Object.fromEntries(sortedEntries));
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const variableOverrides = parseTemplateVariables(searchParams);
	const cacheKey = stableSerializeVariables(variableOverrides);
	const pdfBase64 = await getCachedCvPdfBase64(cacheKey);
	const pdfBuffer = Buffer.from(pdfBase64, "base64");

	return new Response(pdfBuffer, {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": 'attachment; filename="Thomas-Burridge-CV.pdf"',
			"Cache-Control": `public, max-age=0, s-maxage=${CV_PDF_CACHE_SECONDS}, stale-while-revalidate=${CV_PDF_CACHE_SECONDS}`,
		},
	});
}

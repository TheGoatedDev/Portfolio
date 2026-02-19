import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { buildCvData } from "./cv-data";
import { formatDateRange, generateCvPdf } from "./cv-pdf";

describe("formatDateRange", () => {
	it("formats explicit start and end dates", () => {
		const period = formatDateRange(
			new Date("2023-05-01T00:00:00.000Z"),
			new Date("2025-01-01T00:00:00.000Z"),
		);
		expect(period).toBe("May 2023 - Jan 2025");
	});

	it("supports open-ended ranges", () => {
		const period = formatDateRange(
			new Date("2024-04-01T00:00:00.000Z"),
			undefined,
			"Present",
		);
		expect(period).toBe("Apr 2024 - Present");
	});
});

describe("generateCvPdf", () => {
	it("generates a valid PDF document for the CV data", async () => {
		const pdfBytes = await generateCvPdf(buildCvData());

		expect(pdfBytes.byteLength).toBeGreaterThan(1000);
		expect(Buffer.from(pdfBytes).toString("utf8", 0, 5)).toBe("%PDF-");

		const parsedPdf = await PDFDocument.load(pdfBytes);
		expect(parsedPdf.getPageCount()).toBeGreaterThan(0);
	});

	it("creates more than one page when provided long content", async () => {
		const longSummaryLine =
			"Built and maintained secure, resilient products across frontend, backend, cloud, and DevOps at high scale.";

		const verboseCv = {
			...buildCvData(),
			summary: Array.from({ length: 70 }, () => longSummaryLine),
		};

		const pdfBytes = await generateCvPdf(verboseCv);
		const parsedPdf = await PDFDocument.load(pdfBytes);

		expect(parsedPdf.getPageCount()).toBeGreaterThan(1);
	});
});

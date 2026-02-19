import {
	PDFDocument,
	type PDFFont,
	type PDFPage,
	StandardFonts,
	rgb,
} from "pdf-lib";
import type { CvData } from "./cv-data";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 50;
const SECTION_SPACING = 14;
const TEXT_COLOR = rgb(0.1, 0.1, 0.1);
const MUTED_COLOR = rgb(0.35, 0.35, 0.35);
const ACCENT_COLOR = rgb(0.08, 0.28, 0.55);
const PERIOD_FORMATTER = new Intl.DateTimeFormat("en-GB", {
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

type PdfLayoutState = {
	page: PDFPage;
	y: number;
};

type TextBlockOptions = {
	font: PDFFont;
	size: number;
	color?: ReturnType<typeof rgb>;
	lineGap?: number;
	indent?: number;
	maxWidth?: number;
};

const addPage = (pdfDoc: PDFDocument) =>
	pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

const ensureVerticalSpace = (
	pdfDoc: PDFDocument,
	state: PdfLayoutState,
	minimumHeight: number,
) => {
	if (state.y - minimumHeight < MARGIN) {
		state.page = addPage(pdfDoc);
		state.y = PAGE_HEIGHT - MARGIN;
	}
};

const splitTextIntoLines = (
	text: string,
	maxWidth: number,
	font: PDFFont,
	fontSize: number,
) => {
	const normalized = text.trim();
	if (!normalized) {
		return [""];
	}

	const words = normalized.split(/\s+/);
	const lines: string[] = [];
	let currentLine = words[0] ?? "";

	for (const word of words.slice(1)) {
		const candidate = `${currentLine} ${word}`;
		if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
			currentLine = candidate;
			continue;
		}

		lines.push(currentLine);
		currentLine = word;
	}

	lines.push(currentLine);
	return lines;
};

const drawWrappedText = (
	pdfDoc: PDFDocument,
	state: PdfLayoutState,
	text: string,
	{
		font,
		size,
		color = TEXT_COLOR,
		lineGap = 4,
		indent = 0,
		maxWidth = PAGE_WIDTH - MARGIN * 2 - indent,
	}: TextBlockOptions,
) => {
	const lines = splitTextIntoLines(text, maxWidth, font, size);

	for (const line of lines) {
		ensureVerticalSpace(pdfDoc, state, size + lineGap);
		state.page.drawText(line, {
			x: MARGIN + indent,
			y: state.y - size,
			size,
			font,
			color,
		});
		state.y -= size + lineGap;
	}
};

const drawBulletPoint = (
	pdfDoc: PDFDocument,
	state: PdfLayoutState,
	text: string,
	font: PDFFont,
	size: number,
) => {
	const bulletIndent = 2;
	const textIndent = 14;
	const lineGap = 3;
	const contentWidth = PAGE_WIDTH - MARGIN * 2 - textIndent;
	const lines = splitTextIntoLines(text, contentWidth, font, size);

	for (const [lineIndex, line] of lines.entries()) {
		ensureVerticalSpace(pdfDoc, state, size + lineGap);

		if (lineIndex === 0) {
			state.page.drawText("-", {
				x: MARGIN + bulletIndent,
				y: state.y - size,
				size,
				font,
				color: TEXT_COLOR,
			});
		}

		state.page.drawText(line, {
			x: MARGIN + textIndent,
			y: state.y - size,
			size,
			font,
			color: TEXT_COLOR,
		});

		state.y -= size + lineGap;
	}
};

const drawSectionTitle = (
	pdfDoc: PDFDocument,
	state: PdfLayoutState,
	title: string,
	font: PDFFont,
) => {
	const titleSize = 12;
	ensureVerticalSpace(pdfDoc, state, titleSize + SECTION_SPACING);
	state.page.drawText(title.toUpperCase(), {
		x: MARGIN,
		y: state.y - titleSize,
		size: titleSize,
		font,
		color: ACCENT_COLOR,
	});
	state.y -= titleSize + 6;
};

const formatMonthYear = (date: Date) => PERIOD_FORMATTER.format(date);

export const formatDateRange = (
	startDate: Date,
	endDate?: Date,
	openEndedLabel?: string,
) => {
	const formattedStart = formatMonthYear(startDate);
	if (endDate) {
		return `${formattedStart} - ${formatMonthYear(endDate)}`;
	}
	if (openEndedLabel) {
		return `${formattedStart} - ${openEndedLabel}`;
	}
	return formattedStart;
};

export const generateCvPdf = async (cv: CvData) => {
	const pdfDoc = await PDFDocument.create();
	const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

	const state: PdfLayoutState = {
		page: addPage(pdfDoc),
		y: PAGE_HEIGHT - MARGIN,
	};

	pdfDoc.setTitle(`${cv.name} - CV`);
	pdfDoc.setAuthor(cv.name);
	pdfDoc.setProducer("pdf-lib");
	pdfDoc.setSubject("Curriculum Vitae");

	drawWrappedText(pdfDoc, state, cv.name, {
		font: boldFont,
		size: 24,
		color: ACCENT_COLOR,
		lineGap: 6,
	});

	drawWrappedText(pdfDoc, state, cv.title, {
		font: boldFont,
		size: 12,
		color: MUTED_COLOR,
		lineGap: 3,
	});

	drawWrappedText(
		pdfDoc,
		state,
		`${cv.location} | ${cv.email} | ${cv.website}`,
		{
			font: regularFont,
			size: 10,
			color: MUTED_COLOR,
			lineGap: 3,
		},
	);

	if (cv.links.length > 0) {
		drawWrappedText(pdfDoc, state, cv.links.join(" | "), {
			font: regularFont,
			size: 10,
			color: MUTED_COLOR,
			lineGap: 3,
		});
	}

	state.y -= 6;

	drawSectionTitle(pdfDoc, state, "Profile", boldFont);
	for (const summaryLine of cv.summary) {
		drawBulletPoint(pdfDoc, state, summaryLine, regularFont, 10);
	}
	state.y -= SECTION_SPACING;

	drawSectionTitle(pdfDoc, state, "Experience", boldFont);
	for (const job of cv.experience) {
		drawWrappedText(pdfDoc, state, `${job.role} | ${job.company}`, {
			font: boldFont,
			size: 11,
			lineGap: 2,
		});
		drawWrappedText(
			pdfDoc,
			state,
			formatDateRange(job.startDate, job.endDate, "Present"),
			{
				font: regularFont,
				size: 10,
				color: MUTED_COLOR,
				lineGap: 3,
			},
		);
		for (const highlight of job.highlights) {
			drawBulletPoint(pdfDoc, state, highlight, regularFont, 10);
		}
		state.y -= 5;
	}

	state.y -= SECTION_SPACING - 4;
	drawSectionTitle(pdfDoc, state, "Skills", boldFont);
	for (const group of cv.skills) {
		drawWrappedText(
			pdfDoc,
			state,
			`${group.category}: ${group.skills.join(", ")}`,
			{
				font: regularFont,
				size: 10,
				lineGap: 3,
			},
		);
	}

	state.y -= SECTION_SPACING;
	drawSectionTitle(pdfDoc, state, "Education", boldFont);
	for (const item of cv.education) {
		drawWrappedText(
			pdfDoc,
			state,
			`${item.qualification} | ${item.institution}`,
			{
				font: boldFont,
				size: 10,
				lineGap: 2,
			},
		);
		drawWrappedText(pdfDoc, state, formatDateRange(item.startDate, item.endDate), {
			font: regularFont,
			size: 10,
			color: MUTED_COLOR,
			lineGap: 3,
		});
		if (item.details) {
			drawWrappedText(pdfDoc, state, item.details, {
				font: regularFont,
				size: 10,
				lineGap: 3,
			});
		}
		state.y -= 4;
	}

	return pdfDoc.save();
};

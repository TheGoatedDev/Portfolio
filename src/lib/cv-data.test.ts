import { describe, expect, it } from "vitest";
import { buildCvData } from "./cv-data";

describe("buildCvData", () => {
	it("injects template variables across nested string fields", () => {
		const cv = buildCvData({
			yearsExperiencePlus: "42+",
			currentTitle: "Principal Engineer",
			preferredCloud: "Azure",
		});

		expect(cv.title).toBe("Principal Engineer");
		expect(cv.summary[0]).toContain("42+ years");
		expect(cv.skills.flatMap((group) => group.skills)).toContain("Azure");
	});

	it("uses Date objects for all experience and qualification ranges", () => {
		const cv = buildCvData();

		expect(cv.experience.every((item) => item.startDate instanceof Date)).toBe(
			true,
		);
		expect(
			cv.education.every(
				(qualification) => qualification.startDate instanceof Date,
			),
		).toBe(true);
		expect(
			cv.experience.every(
				(item) => item.endDate === undefined || item.endDate instanceof Date,
			),
		).toBe(true);
		expect(
			cv.education.some((qualification) => qualification.endDate === undefined),
		).toBe(true);
	});
});

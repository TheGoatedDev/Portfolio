import { beforeEach, describe, expect, it, vi } from "vitest";

const validFields = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	message: "I need help building a small platform.",
	"cf-turnstile-response": "turnstile-token",
};

const buildFormData = (fields: Record<string, string> = {}) => {
	const formData = new FormData();
	for (const [key, value] of Object.entries({ ...validFields, ...fields })) {
		formData.set(key, value);
	}
	return formData;
};

const loadAction = async () => {
	vi.resetModules();
	return import("./contact");
};

const stubFetch = (turnstileSuccess = true) => {
	const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
		const url = String(input);

		if (url.includes("challenges.cloudflare.com/turnstile")) {
			return Response.json({ success: turnstileSuccess });
		}

		return Response.json({ id: "email-id" });
	});

	vi.stubGlobal("fetch", fetchMock);
	return fetchMock;
};

describe("sendContactMessage", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllEnvs();
		vi.stubEnv("RESEND_API_KEY", "resend-key");
		vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-key");
		vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-key");
	});

	it("returns the existing required-field error for empty fields", async () => {
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData({ name: "", email: "", message: "" }),
		);

		expect(result).toMatchObject({
			status: "error",
			error: "Please fill in every field.",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("returns the existing email error for invalid email", async () => {
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData({ email: "not-an-email" }),
		);

		expect(result).toMatchObject({
			status: "error",
			error: "That email address looks off. Could you double-check?",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("returns fake success for honeypot submissions without sending mail", async () => {
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData({ company: "Bot Corp" }),
		);

		expect(result).toMatchObject({
			status: "success",
			message: "Got it. I'll reply within ~24 hours.",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("rejects missing Turnstile tokens before sending mail", async () => {
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData({ "cf-turnstile-response": "" }),
		);

		expect(result).toMatchObject({ status: "error" });
		expect(result.status === "error" ? result.error : "").toContain(
			"Could not verify the anti-spam check.",
		);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("rejects failed Turnstile verification before sending mail", async () => {
		const fetchMock = stubFetch(false);
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData(),
		);

		expect(result).toMatchObject({ status: "error" });
		expect(result.status === "error" ? result.error : "").toContain(
			"Could not verify the anti-spam check.",
		);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it("sends mail after successful Turnstile verification", async () => {
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData(),
		);

		expect(result).toMatchObject({
			status: "success",
			message: "Got it. I'll reply within ~24 hours.",
		});
		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(fetchMock.mock.calls[1]?.[0]).toBe("https://api.resend.com/emails");
		const resendRequest = fetchMock.mock.calls[1]?.[1] as
			| RequestInit
			| undefined;
		expect(JSON.parse(String(resendRequest?.body))).toMatchObject({
			reply_to: validFields.email,
			subject: `New message from ${validFields.name} via portfolio`,
		});
	});

	it("rate limits repeated attempts for the same email", async () => {
		const fetchMock = stubFetch(false);
		const { sendContactMessage } = await loadAction();

		for (let attempt = 0; attempt < 3; attempt += 1) {
			await sendContactMessage({ status: "idle" }, buildFormData());
		}

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData(),
		);

		expect(result).toMatchObject({
			status: "error",
			error: "Too many attempts. Please wait a few minutes and try again.",
		});
		expect(fetchMock).toHaveBeenCalledTimes(3);
	});

	it("rejects messages with too many links", async () => {
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData({
				message:
					"https://a.test https://b.test https://c.test https://d.test",
			}),
		);

		expect(result).toMatchObject({
			status: "error",
			error: "Please keep links to a minimum.",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("rejects overlong messages", async () => {
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData({ message: "x".repeat(4001) }),
		);

		expect(result).toMatchObject({
			status: "error",
			error: "That message is too long. Please keep it under 4000 characters.",
		});
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("returns the existing Resend config error after anti-spam passes", async () => {
		vi.stubEnv("RESEND_API_KEY", "");
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData(),
		);

		expect(result).toMatchObject({ status: "error" });
		expect(result.status === "error" ? result.error : "").toContain(
			"The form is not configured to send mail right now.",
		);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it("skips Turnstile in non-production when keys are missing", async () => {
		vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
		vi.stubEnv("TURNSTILE_SECRET_KEY", "");
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData({ "cf-turnstile-response": "" }),
		);

		expect(result).toMatchObject({ status: "success" });
		expect(warnSpy).toHaveBeenCalledWith(
			"[contact] Turnstile is not configured; skipping in dev",
		);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock.mock.calls[0]?.[0]).toBe("https://api.resend.com/emails");
	});

	it("blocks production sends when Turnstile keys are missing", async () => {
		vi.stubEnv("NODE_ENV", "production");
		vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
		vi.stubEnv("TURNSTILE_SECRET_KEY", "");
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		const fetchMock = stubFetch();
		const { sendContactMessage } = await loadAction();

		const result = await sendContactMessage(
			{ status: "idle" },
			buildFormData({ "cf-turnstile-response": "" }),
		);

		expect(result).toMatchObject({ status: "error" });
		expect(result.status === "error" ? result.error : "").toContain(
			"The form is not configured to send mail right now.",
		);
		expect(errorSpy).toHaveBeenCalledWith(
			"[contact] Turnstile is not configured for production",
		);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});

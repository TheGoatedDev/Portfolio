import { logs } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

let loggerProvider: LoggerProvider | undefined;

if (!projectToken || !host) {
	if (process.env.NODE_ENV === "development") {
		const missingVariable = !projectToken
			? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN"
			: "NEXT_PUBLIC_POSTHOG_HOST";

		throw new Error(
			`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
		);
	}
} else {
	loggerProvider = new LoggerProvider({
		resource: resourceFromAttributes({ "service.name": "portfolio" }),
		processors: [
			new BatchLogRecordProcessor({
				exporter: new OTLPLogExporter({
					url: `${host}/i/v1/logs`,
					headers: {
						Authorization: `Bearer ${projectToken}`,
						"Content-Type": "application/json",
					},
				}),
			}),
		],
	});
}

export const posthogLogger = loggerProvider?.getLogger("posthog-portfolio-logs");

export function register() {
	if (process.env.NEXT_RUNTIME === "nodejs" && loggerProvider) {
		logs.setGlobalLoggerProvider(loggerProvider);
	}
}

export async function flushPostHogLogs() {
	await loggerProvider?.forceFlush();
}

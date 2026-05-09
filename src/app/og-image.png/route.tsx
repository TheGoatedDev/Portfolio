import ImageResponse from "@takumi-rs/image-response";

export const runtime = "nodejs";

const size = {
	width: 1200,
	height: 630,
};

// Approximate sRGB hex equivalents of The Plate's OKLCH tokens.
// Background:       oklch(0.16 0.008 240)
// Foreground:       oklch(0.95 0.005 220)
// Muted-foreground: oklch(0.72 0.010 220)
// Hairline:         oklch(0.30 0.012 240)
const COLORS = {
	background: "#1F2126",
	foreground: "#EEF0F2",
	muted: "#A8ABB2",
	hairline: "#3F424B",
};

export function GET() {
	const response = new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				background: COLORS.background,
				color: COLORS.foreground,
				padding: "64px 72px",
				fontFamily: "Geist",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "baseline",
					fontFamily: "Geist Mono",
					fontSize: 18,
					letterSpacing: 4,
					color: COLORS.muted,
					textTransform: "uppercase",
				}}
			>
				<span style={{ display: "flex" }}>Thomas Burridge</span>
				<span style={{ display: "flex" }}>thegoated.dev</span>
			</div>

			<div
				style={{
					height: 1,
					background: COLORS.hairline,
					marginTop: 24,
				}}
			/>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					marginTop: "auto",
					marginBottom: "auto",
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 92,
						fontWeight: 300,
						lineHeight: 0.98,
						letterSpacing: -1.5,
					}}
				>
					Freelance Software
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 92,
						fontWeight: 300,
						lineHeight: 1.06,
						letterSpacing: -1.5,
					}}
				>
					Engineer
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 36,
						fontSize: 30,
						lineHeight: 1.3,
						color: COLORS.muted,
					}}
				>
					SaaS, IoT, and infrastructure-heavy products.
				</div>
			</div>

			<div
				style={{
					height: 1,
					background: COLORS.hairline,
					marginBottom: 24,
				}}
			/>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "baseline",
					fontFamily: "Geist Mono",
					fontSize: 18,
					letterSpacing: 4,
					color: COLORS.muted,
					textTransform: "uppercase",
				}}
			>
				<span style={{ display: "flex" }}>
					Selected work · About · Contact
				</span>
				<span style={{ display: "flex", color: COLORS.foreground }}>
					Available for new work
				</span>
			</div>
		</div>,
		{
			...size,
			format: "png",
			headers: {
				"Cache-Control": "public, immutable, max-age=31536000",
			},
		},
	);

	return response;
}

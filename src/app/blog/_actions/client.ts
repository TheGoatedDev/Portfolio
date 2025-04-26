import { createDirectus, rest } from "@directus/sdk";

// Shared Directus client (replace with your Directus URL)
export const directus = createDirectus("https://directus.thegoated.dev").with(
	rest(),
); // TODO: Replace with your Directus API URL

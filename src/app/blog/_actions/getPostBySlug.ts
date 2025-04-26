import { readItems } from "@directus/sdk";
import { directus } from "./client";
import { Post } from "./types";

export async function getPostBySlug(id: string): Promise<Post | null> {
	const posts = await directus.request(
		readItems("PortfolioBlog", {
			filter: { id: { _eq: id } },
			fields: ["id", "Title", "Content", "date_created", "Banner_Image"],
			limit: 1,
		}),
	);
	return Array.isArray(posts) && posts.length > 0 ? (posts[0] as Post) : null;
}

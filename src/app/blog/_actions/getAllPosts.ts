import { readItems } from "@directus/sdk";
import { directus } from "./client";
import { Post } from "./types";

export async function getAllPosts(): Promise<Post[]> {
	const posts = await directus.request(
		readItems("PortfolioBlog", {
			fields: ["id", "Title", "Content", "date_created", "Banner_Image"],
			sort: ["-date_created"],
		}),
	);
	return posts as Post[];
}

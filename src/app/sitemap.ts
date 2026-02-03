import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/_actions/getAllPosts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPosts();
	const baseUrl = "https://thegoated.dev";

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		...posts.map((post) => ({
			url: `${baseUrl}/blog/${post.id}`,
			lastModified: new Date(post.date_created),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})),
	];
}

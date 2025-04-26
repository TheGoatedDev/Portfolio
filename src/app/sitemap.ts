import { MetadataRoute } from "next";
import { getAllPosts } from "./blog/_actions/getAllPosts";

const lastModified = new Date().toISOString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPosts();
	const baseUrl = "https://thegoated.dev";
	return [
		{
			url: baseUrl,
			lastModified,
		},
		...posts.map((post) => ({
			url: `${baseUrl}/blog/${post.id}`,
			lastModified: post.date_created,
		})),
	];
}

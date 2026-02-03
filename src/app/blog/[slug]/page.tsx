import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Markdown } from "@/components/ui/markdown";
import { notFound } from "next/navigation";
import { getAllPosts } from "../_actions/getAllPosts";
import { getPostBySlug as getPostById } from "../_actions/getPostBySlug";
import type { WithContext, Article } from "schema-dts";

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const post = await getPostById(slug);
	if (!post) return notFound();

	const articleSchema: WithContext<Article> = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.Title,
		description: post.Content?.replace(/[#_*`>\-\[\]!\(\)]/g, "").slice(0, 160) || "",
		author: {
			"@type": "Person",
			name: "Thomas Burridge",
			url: "https://thegoated.dev",
		},
		datePublished: post.date_created,
		dateModified: post.date_updated || post.date_created,
		image: post.Banner_Image
			? `https://directus.thegoated.dev/assets/${post.Banner_Image}`
			: undefined,
		publisher: {
			"@type": "Person",
			name: "Thomas Burridge",
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://thegoated.dev/blog/${slug}`,
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
				}}
			/>
			<Header />
			<main className="container min-h-screen pt-24 pb-16 flex flex-col items-center">
				<div className="max-w-2xl w-full">
					<Card className=" pt-0">
						{post.Banner_Image && (
							<img
								src={`https://directus.thegoated.dev/assets/${post.Banner_Image}`}
								alt={`Banner image for ${post.Title}`}
								className="w-full h-64 object-cover rounded-t-xl"
							/>
						)}

						<CardContent>
							<h1 className="text-3xl font-bold mb-2 mt-6">{post.Title}</h1>
							<div className="text-muted-foreground text-xs mb-6">
								{new Date(post.date_created).toLocaleDateString()}
							</div>
							<Markdown className="prose prose-neutral dark:prose-invert max-w-none">
								{post.Content ?? ""}
							</Markdown>
						</CardContent>
					</Card>
				</div>
			</main>
			<Footer />
		</>
	);
}

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({
	params,
}: { params: Promise<{ slug: string }> }) {
	const post = await getPostById((await params).slug);
	if (!post) return {};
	const description =
		post.Content?.replace(/[#_*`>\-\[\]!\(\)]/g, "").slice(0, 160) || "";
	const images = post.Banner_Image
		? [
				{
					url: `https://directus.thegoated.dev/assets/${post.Banner_Image}`,
					alt: post.Title,
				},
			]
		: [];
	return {
		title: post.Title,
		description,
		alternates: {
			canonical: `/blog/${(await params).slug}`,
		},
		openGraph: {
			title: post.Title,
			description,
			images,
			type: "article",
			url: `https://thegoated.dev/blog/${post.id}`,
		},
		twitter: {
			card: images.length ? "summary_large_image" : "summary",
			title: post.Title,
			description,
			images,
		},
	};
}

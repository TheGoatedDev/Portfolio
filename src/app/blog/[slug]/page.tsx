import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Markdown } from "@/components/ui/markdown";
import { notFound } from "next/navigation";
import { getAllPosts } from "../_actions/getAllPosts";
import { getPostBySlug as getPostById } from "../_actions/getPostBySlug";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function BlogPostPage(props: PageProps) {
	const { slug } = await props.params;

	const post = await getPostById(slug);
	if (!post) return notFound();

	return (
		<>
			<Header />
			<main className="container min-h-screen pt-24 pb-16 flex flex-col items-center">
				<div className="max-w-2xl w-full">
					<Card className=" pt-0">
						{post.Banner_Image && (
							<img
								src={`https://directus.thegoated.dev/assets/${post.Banner_Image}`}
								alt={post.Title}
								className="w-full h-64 object-cover rounded-t-xl"
							/>
						)}

						<CardContent>
							<div className="text-muted-foreground text-xs">
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
}: { params: { slug: string } }) {
	const post = await getPostById(params.slug);
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

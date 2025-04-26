import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Markdown } from "@/components/ui/markdown";
import Link from "next/link";
import { getAllPosts } from "./_actions/getAllPosts";

export default async function BlogPage() {
	const posts = await getAllPosts();

	return (
		<>
			<Header />
			<main className="container min-h-screen pt-24 pb-16">
				<h1 className="text-4xl font-bold mb-10">Blog</h1>
				<div className="grid gap-8 max-w-2xl mx-auto">
					{posts.length ? (
						posts.map((post) => (
							<Card key={post.id}>
								{post.Banner_Image && (
									<img
										src={`https://directus.thegoated.dev/assets/${post.Banner_Image}`}
										alt={post.Title}
										className="w-full h-48 object-cover rounded-t-xl"
									/>
								)}
								<CardHeader>
									<CardTitle>
										<Link href={`/blog/${post.id}`} className="hover:underline">
											{post.Title}
										</Link>
									</CardTitle>
									<div className="text-muted-foreground text-xs mt-1">
										{new Date(post.date_created).toLocaleDateString()}
									</div>
								</CardHeader>
								<CardContent>
									<Markdown className="line-clamp-3 text-sm text-muted-foreground">
										{post.Content ?? ""}
									</Markdown>
								</CardContent>
							</Card>
						))
					) : (
						<p className="text-center text-muted-foreground">No posts found.</p>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}

import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";

// You can extend this mapping for more custom components
const components: Options["components"] = {
	h1: ({ node, ...props }) => (
		<h1 className="text-3xl font-bold mt-4 mb-4" {...props} />
	),
	h2: ({ node, ...props }) => (
		<h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
	),
	h3: ({ node, ...props }) => (
		<h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
	),
	p: ({ node, ...props }) => <p className="mb-4" {...props} />,
	ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4" {...props} />,
	ol: ({ node, ...props }) => (
		<ol className="list-decimal ml-6 mb-4" {...props} />
	),
	li: ({ node, ...props }) => <li className="mb-1" {...props} />,
	a: ({ node, ...props }) => (
		<a
			className="text-primary underline"
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	),
	code: ({ node, ...props }) => (
		<code className="bg-muted px-1 py-0.5 rounded text-sm" {...props} />
	),
	pre: ({ node, ...props }) => (
		<pre className="bg-muted p-4 rounded mb-4 overflow-x-auto" {...props} />
	),
	blockquote: ({ node, ...props }) => (
		<blockquote
			className="border-l-4 border-muted pl-4 italic text-muted-foreground my-4"
			{...props}
		/>
	),
	img: ({ node, ...props }) => (
		<img className="rounded max-w-full my-4" {...props} />
	),
};

export function Markdown({
	children,
	className = "prose prose-neutral dark:prose-invert max-w-none",
}: { children: string; className?: string }) {
	return (
		<div className={className}>
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
				{children}
			</ReactMarkdown>
		</div>
	);
}

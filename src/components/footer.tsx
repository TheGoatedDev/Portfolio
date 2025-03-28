import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t py-12 md:py-16">
			<div className="container flex flex-col md:flex-row justify-between items-center">
				<div className="mb-6 md:mb-0">
					<Link href="/" className="text-xl font-bold tracking-tighter">
						<span className="text-primary">Thomas </span>Burridge
					</Link>
					<p className="mt-2 text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} Thomas Burridge. All rights
						reserved.
					</p>
				</div>

				<div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
					<nav className="flex gap-4 md:gap-6">
						<Link
							href="#projects"
							className="text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							Projects
						</Link>
						<Link
							href="#skills"
							className="text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							Skills
						</Link>
						<Link
							href="#about"
							className="text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							About
						</Link>
						<Link
							href="#contact"
							className="text-sm text-muted-foreground hover:text-primary transition-colors"
						>
							Contact
						</Link>
					</nav>

					<div className="h-4 w-px bg-border hidden md:block" />

					<div className="text-sm text-muted-foreground">
						Designed & Built with ❤️
					</div>
				</div>
			</div>
		</footer>
	);
}

"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
	{ name: "Work", href: "#work" },
	{ name: "About", href: "#about" },
	{ name: "Contact", href: "#contact" },
];

export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) return;
		const original = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = original;
		};
	}, [isOpen]);

	return (
		<header className="sticky top-0 z-40 bg-background/0 backdrop-blur-sm">
			<div className="editorial-shell flex h-16 items-center justify-between">
				<Link
					href="/"
					className="font-serif text-lg font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
					onClick={() => setIsOpen(false)}
				>
					Thomas Burridge
				</Link>

				<nav className="hidden md:flex items-center gap-8">
					{NAV.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{item.name}
						</Link>
					))}
				</nav>

				<button
					type="button"
					onClick={() => setIsOpen((v) => !v)}
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
					className="md:hidden inline-flex items-center justify-center w-9 h-9 -mr-2 text-foreground transition-colors hover:text-muted-foreground"
				>
					{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			{isOpen && (
				<div className="md:hidden fixed inset-0 top-16 z-40 bg-background">
					<nav className="editorial-shell pt-12 pb-8 flex flex-col gap-6">
						{NAV.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setIsOpen(false)}
								className="font-serif text-3xl font-light text-foreground transition-opacity hover:opacity-70"
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}

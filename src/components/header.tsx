"use client";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Menu, Moon, Sun, Twitter, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const { theme, setTheme } = useTheme();
	const isMobile = useMobile();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const navItems = [
		{ name: "Projects", href: "#projects" },
		{ name: "Skills", href: "#skills" },
		{ name: "About", href: "#about" },
		{ name: "Contact", href: "#contact" },
	];

	const socialLinks = [
		{
			name: "GitHub",
			href: "https://github.com/TheGoatedDev",
			icon: <Github className="h-5 w-5" />,
		},
		{
			name: "LinkedIn",
			href: "https://www.linkedin.com/in/thomas-nearlunar/",
			icon: <Linkedin className="h-5 w-5" />,
		},
	];

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				isScrolled
					? "bg-background/80 backdrop-blur-md shadow-sm"
					: "bg-transparent",
			)}
		>
			<div className="container flex h-16 items-center justify-between mx-auto px-4">
				<Link
					href="/"
					className="text-xl font-bold tracking-tighter transition-colors hover:text-primary"
					onClick={closeMenu}
				>
					<span className="text-primary">Thomas</span> Burridge
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-8">
					<ul className="flex space-x-6">
						{navItems.map((item) => (
							<li key={item.name}>
								<Link
									href={item.href}
									className="text-sm font-medium transition-colors hover:text-primary"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>

					<div className="flex items-center space-x-4">
						{socialLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="text-muted-foreground transition-colors hover:text-primary"
								aria-label={link.name}
								target="_blank"
								rel="noopener noreferrer"
							>
								{link.icon}
							</Link>
						))}

						<Button
							variant="ghost"
							size="icon"
							onClick={toggleTheme}
							aria-label="Toggle theme"
						>
							{theme === "dark" ? (
								<Sun className="h-5 w-5" />
							) : (
								<Moon className="h-5 w-5" />
							)}
						</Button>
					</div>
				</nav>

				{/* Mobile Navigation */}
				<div className="flex items-center md:hidden">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleTheme}
						className="mr-2"
						aria-label="Toggle theme"
					>
						{theme === "dark" ? (
							<Sun className="h-5 w-5" />
						) : (
							<Moon className="h-5 w-5" />
						)}
					</Button>

					<Button
						variant="ghost"
						size="icon"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</Button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && isMobile && (
				<div className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm">
					<nav className="container py-8">
						<ul className="flex flex-col space-y-6">
							{navItems.map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="text-xl font-medium transition-colors hover:text-primary"
										onClick={closeMenu}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>

						<div className="mt-8 flex items-center space-x-6">
							{socialLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="text-muted-foreground transition-colors hover:text-primary"
									aria-label={link.name}
									target="_blank"
									rel="noopener noreferrer"
									onClick={closeMenu}
								>
									{link.icon}
								</Link>
							))}
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}

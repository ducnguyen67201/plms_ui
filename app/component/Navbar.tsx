"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useAuth();

	return (
		<nav className="bg-surface shadow-md text-textDark">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<Link href="/">
						<span className="text-xl font-bold text-primary">PLMS</span>
					</Link>

					<div className="hidden md:flex space-x-6 items-center">
						<Link
							href="/"
							className="hover:text-primary transition">
							Problems
						</Link>
						<Link
							href="/about"
							className="hover:text-primary transition">
							Discussion
						</Link>
						<Link
							href="/contact"
							className="hover:text-primary transition">
							Learning Material
						</Link>
						<Link
							onClick={() => logout()}
							href="/"
							className="hover:text-primary transition flex items-center justify-center h-full  hover:bg-blue-100 rounded-md">
							Log Out
						</Link>
					</div>

					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="focus:outline-none">
							<svg
								className="w-6 h-6 text-textDark"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								{isOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden px-4 pb-4 space-y-2">
					<Link
						href="/"
						className="block hover:text-primary">
						Home
					</Link>
					<Link
						href="/about"
						className="block hover:text-primary">
						About
					</Link>
					<Link
						href="/contact"
						className="block hover:text-primary">
						Contact
					</Link>
					<Link
						onClick={() => logout()}
						href="/"
						className="hover:text-primary transition flex items-center justify-center h-full  hover:bg-blue-100 rounded-md">
						Log Out
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

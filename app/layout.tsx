"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "./component/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	const hideNavbar = pathname === "/v1/login";

	return (
		<html lang="en">
			<body>
				<AuthProvider>
					{!hideNavbar && <Navbar />}
					<main>{children}</main>
				</AuthProvider>
			</body>
		</html>
	);
}

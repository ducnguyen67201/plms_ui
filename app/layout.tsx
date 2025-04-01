"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "./component/Navbar";
import "./globals.css";
import { StoreProvider } from "./store-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	const hideNavbar = pathname === "/v1/login";

	return (
		<html lang="en">
			<body>
				<StoreProvider>
					<AuthProvider>
						{!hideNavbar && <Navbar />}
						<main>{children}</main>
					</AuthProvider>
				</StoreProvider>
			</body>
		</html>
	);
}

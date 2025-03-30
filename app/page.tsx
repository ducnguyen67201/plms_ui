"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const { user, logout } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/v1/login");
		}
	}, [user]);

	return user ? (
		<div style={{ padding: "2rem" }}>
			<h1>Home - Protected</h1>
			<p>Welcome! You're logged in.</p>
			<button onClick={logout}>Logout</button>
		</div>
	) : null;
}

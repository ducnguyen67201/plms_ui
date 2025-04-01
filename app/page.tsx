"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import HomePage from "./v1/homepage/page";

// Ensure the correct path to the module
import UserState from "@/lib/store/slices/loginSlice";

export default function Home() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const userState = useSelector((state: { login: ReturnType<typeof UserState> }) => state.login);

	useEffect(() => {
		if (!user) {
			router.push("/v1/login");
		}
	}, [user]);

	return user ? (
		<div style={{ padding: "2rem" }}>
			<h1>{userState.username}</h1>
			<HomePage />
			<button
				onClick={() => {
					logout();
					router.push("/v1/login");
				}}
				className="bg-red-500 text-white px-4 py-2 rounded"
			/>
		</div>
	) : null;
}

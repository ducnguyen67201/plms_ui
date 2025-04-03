"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

import HomePage from "./v1/homepage/page";

export default function Home() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/v1/login");
		}
	}, [user]);

	return user ? <HomePage /> : null;
}

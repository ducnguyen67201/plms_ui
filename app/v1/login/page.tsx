"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/auth";

import { useAppDispatch } from "@/lib/store/hooks";
import { setUserData } from "@/lib/store/slices/loginSlice";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useAppDispatch();

	const { login } = useAuth();
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await loginUser(username, password);
			if (response.result === "success") {
				login(response.data.user_id.toString());
				dispatch(setUserData(response.data));
				router.push("/");
			} else {
				console.log("Invalid credentials");
			}
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-indigo-50 p-8 rounded-2xl shadow-lg w-full max-w-sm">
				<h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Login</h1>
				<form
					onSubmit={handleLogin}
					className="space-y-4">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 bg-white"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 bg-white"
					/>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-rose-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

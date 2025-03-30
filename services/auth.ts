import { apiClient } from "@/lib/ApiClient";

interface LoginResponse {
	result: string;
	message: string;
	data: {
		user_id: number;
		role_id: number;
		username: string;
		email: string;
		registration_date: string;
	};
}

export async function loginUser(username: string, password: string) {
	console.log("Logging in with", JSON.stringify({ username, password }));
	const res = await apiClient<LoginResponse>("/user/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Login failed");
	}
}

export async function logoutUser() {
	return apiClient("/user/logout", {
		method: "POST",
	});
}

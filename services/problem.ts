import { apiClient } from "@/lib/ApiClient";

interface Problem {
	problem_id: number | null;
	contest_id: number | null;
	title: string;
	description: string;
	difficulty_level: string;
	repeated_times: number[];
	type: string;
}
interface GetAllProblemsResponse {
	result: string;
	message: string;
	data: Problem[];
}

export async function getAllProblem() {
	const res = await apiClient<GetAllProblemsResponse>("/problem/all", {
		method: "POST",
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to fetch problems");
	}
}

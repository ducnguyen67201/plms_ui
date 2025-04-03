import { apiClient } from "@/lib/ApiClient";

interface Problem {
	problem_id: number | null;
	contest_id: number | null;
	title: string;
	description: string;
	difficulty_level: string;
	repeated_times: number;
	type: string;
}

interface TestCase {
	test_case_id: number | null;
	problem_id: number | null;
	input: string;
	expected_output: string;
	created_at: string;
	updated_at: string;
	is_active: boolean;
}

export interface ProblemWithTestCase extends Problem {
	test_cases: TestCase[];
}
interface GetAllProblemsResponse {
	result: string;
	message: string;
	data: Problem[];
}

interface ProblemResponse {
	result: string;
	message: string;
	data: any;
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

export async function getProblemById(problemId: number) {
	const res = await apiClient<ProblemResponse>(`/problem/${problemId}`, {
		method: "POST",
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to fetch problem by ID");
	}
}

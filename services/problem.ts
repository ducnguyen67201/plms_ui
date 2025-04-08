import { apiClient } from "@/lib/ApiClient";

export interface Problem {
	problem_id: number | null;
	contest_id: number | null;
	title: string;
	description: string;
	difficulty_level: string;
	repeated_times: number;
	type: string;
	method_name: string;
	skeleton_code: string;
}

export interface TestCase {
	test_case_id: number | null;
	problem_id: number | null;
	input: string;
	expected_output: string;
	created_at: string;
	updated_at: string;
	is_active: string;
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

export async function saveProblem(problem: Problem) {
	const res = await apiClient<ProblemResponse>(`/problem/save`, {
		method: "POST",
		body: JSON.stringify(problem),
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to save problem");
	}
}

export async function saveTestCase(testCase: TestCase) {
	const res = await apiClient<ProblemResponse>(`/testcase/save`, {
		method: "POST",
		body: JSON.stringify(testCase),
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to save test case");
	}
}

export async function submitSolution(solution: { problem_id: number; code: string }) {}

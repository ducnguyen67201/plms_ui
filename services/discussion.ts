import { apiClient } from "@/lib/ApiClient";

export interface Discussion {
	discussion_id: number | null;
	contest_id: number | null;
	title: string;
	content: string;
	discussion_like: number;
	created_date: string;
	updated_at: string;
}

interface GetDiscussionByIdResponse {
	result: string;
	message: string;
	data: Discussion;
}

interface GetAllDiscussionsResponse {
	result: string;
	message: string;
	data: Discussion[];
}

export async function getAllDiscussions() {
	const res = await apiClient<GetAllDiscussionsResponse>("/discussion/all", {
		method: "POST",
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to fetch discussions");
	}
}

export async function getDiscussionById(id: number) {
	const res = await apiClient<GetDiscussionByIdResponse>(`/discussion/${id}`, {
		method: "POST",
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to fetch discussion by ID");
	}
}

export async function saveDiscussion(discussion: Discussion) {
	const res = await apiClient<GetDiscussionByIdResponse>(`/discussion/save`, {
		method: "POST",
		body: JSON.stringify(discussion),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to save discussion");
	}
}

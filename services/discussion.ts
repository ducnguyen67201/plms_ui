import { apiClient } from "@/lib/ApiClient";

export interface Discussion {
	discussion_id: number | null;
	contest_id: number | null;
	title: string;
	content: string;
	discussion_like: number;
	created_at: string;
	updated_at: string;
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

import { apiClient } from "@/lib/ApiClient";

export interface Discussion {
	discussion_id: number;
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

interface CommonResponse {
	result: string;
	message: string;
	data: Discussion;
}

interface GetAllDiscussionsResponse {
	result: string;
	message: string;
	data: Discussion[];
}

export interface CreateComment {
	discussion_id: number;
	user_id: number;
	user_comment: string;
}

export interface DiscussionWithComment {
	discussion_id: number;
	title: string;
	topic: string;
	content: string;
	discussion_like: number;
	created_date: string;
	created_by: number;
	comment: Comment[];
}
export interface GetCommentByDiscussionIdResponse {
	result: string;
	message: string;
	data: DiscussionWithComment | null;
}

export interface Comment {
	user_id: number;
	user_comment: string;
	username: string;
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

export async function createComment(comment: CreateComment) {
	const res = await apiClient<CommonResponse>(`/discussion/comment/create`, {
		method: "POST",
		body: JSON.stringify(comment),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to create comment");
	}
}

export async function GetCommentByDiscussionId(discussion_id: number) {
	const res = await apiClient<GetCommentByDiscussionIdResponse>(`/discussion/comment/all/${discussion_id}`, {
		method: "POST",
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to fetch comments by discussion ID");
	}
}

import { apiClient } from "@/lib/ApiClient";

export interface LearningMaterial {
	material_id: number | null;
	material_category_id: number | null;
	posted_by: number;
	title: string;
	content: string;
	material_date: string;
}
interface GetLearningMaterialByIdResponse {
	result: string;
	message: string;
	data: LearningMaterial;
}

interface GetAllLearningMaterialsResponse {
	result: string;
	message: string;
	data: LearningMaterial[];
}

export async function getAllLearningMaterialProblem() {
	const res = await apiClient<GetLearningMaterialByIdResponse>("/learning/all", {
		method: "POST",
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to fetch learning materials");
	}
}

export async function getLearningMaterialById(id: number) {
	const res = await apiClient<GetLearningMaterialByIdResponse>(`/learning/${id}`, {
		method: "POST",
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to fetch learning material by ID");
	}
}

export async function saveLearningMaterial(material: LearningMaterial) {
	const res = await apiClient<GetAllLearningMaterialsResponse>(`/learning/save`, {
		method: "POST",
		body: JSON.stringify(material),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to save learning material");
	}
}

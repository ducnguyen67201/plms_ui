import { apiClient } from "@/lib/ApiClient";

export interface LearningMaterial {
	material_id: number | null;
	material_category_id: number | null;
	posted_by: string;
	title: string;
	content: string;
	material_date: string;
}

interface GetAllLearningMaterialsResponse {
	result: string;
	message: string;
	data: LearningMaterial[];
}

export async function getAllLearningMaterialProblem() {
	const res = await apiClient<GetAllLearningMaterialsResponse>("/learning/all", {
		method: "POST",
	});

	if (res.result == "success") {
		return res;
	} else {
		throw new Error(res.message || "Failed to fetch learning materials");
	}
}

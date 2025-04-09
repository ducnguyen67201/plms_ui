import { getLearningMaterialById, LearningMaterial } from "@/services/learning_material";
import LearningMaterialDetailsClient from "./LearningMaterialDetailsClient";

export default async function LearningMaterialPage({ params }: { params: { id: string } }) {
	const { id } = await params;
	const res = await getLearningMaterialById(Number(id));
	if (res.result !== "success") {
		throw new Error("Failed to fetch learning material by ID");
	}

	const learningMaterial: LearningMaterial = res.data;
	console.log("Learning Material Details:", learningMaterial);
	return <LearningMaterialDetailsClient material={learningMaterial} />;
}

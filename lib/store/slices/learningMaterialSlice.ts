import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StatusType = "idle" | "loading" | "succeeded" | "failed";
export interface Meta {
	status: StatusType;
	error: string | null;
}

interface LearningMaterial {
	material_id: number | null;
	material_category_id: number | null;
	posted_by: string;
	title: string;
	content: string;
	material_date: string;
}

interface LearningMaterialState {
	materials: LearningMaterial[];
	meta: Meta;
}

const initialState: LearningMaterialState = {
	materials: [],
	meta: {
		status: "idle",
		error: null,
	},
};

const learningMaterialSlice = createSlice({
	name: "learningMaterial",
	initialState,
	reducers: {
		setLearningMaterials(state, action: PayloadAction<LearningMaterial[]>) {
			state.materials = action.payload;
		},
		setMeta(state, action: PayloadAction<Meta>) {
			state.meta = action.payload;
		},
	},
});

export const { setLearningMaterials, setMeta } = learningMaterialSlice.actions;
export default learningMaterialSlice.reducer;

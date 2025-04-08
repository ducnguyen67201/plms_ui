import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StatusType = "idle" | "loading" | "succeeded" | "failed";
export interface Meta {
	status: StatusType;
	error: string | null;
}

interface Problem {
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

interface ProblemState {
	problems: Problem[];
	meta: Meta;
}

const initialState: ProblemState = {
	problems: [],
	meta: {
		status: "idle",
		error: null,
	},
};

const problemSlice = createSlice({
	name: "problem",
	initialState,
	reducers: {
		setProblems(state, action: PayloadAction<Problem[]>) {
			state.problems = action.payload;
		},
		setMeta(state, action: PayloadAction<Meta>) {
			state.meta = action.payload;
		},
		clearProblems(state) {
			Object.assign(state, initialState);
		},
	},
});

export const { setProblems, setMeta, clearProblems } = problemSlice.actions;
export default problemSlice.reducer;

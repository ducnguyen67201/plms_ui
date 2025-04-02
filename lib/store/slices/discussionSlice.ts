import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StatusType = "idle" | "loading" | "succeeded" | "failed";
export interface Meta {
	status: StatusType;
	error: string | null;
}

interface Discussion {
	discussion_id: number | null;
	title: string;
	topic: string;
	content: string;
	discussion_like: number;
	created_date: string;
	created_by: string;
}

interface DiscussionState {
	discussions: Discussion[];
	meta: Meta;
}

const initialState: DiscussionState = {
	discussions: [],
	meta: {
		status: "idle",
		error: null,
	},
};

const discussionSlice = createSlice({
	name: "discussion",
	initialState,
	reducers: {
		setDiscussions(state, action: PayloadAction<Discussion[]>) {
			state.discussions = action.payload;
		},
		setMeta(state, action: PayloadAction<Meta>) {
			state.meta = action.payload;
		},
	},
});

export const { setDiscussions, setMeta } = discussionSlice.actions;
export default discussionSlice.reducer;

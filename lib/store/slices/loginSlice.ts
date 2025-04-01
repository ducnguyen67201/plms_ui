import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StatusType = "idle" | "loading" | "succeeded" | "failed";
export interface Meta {
	status: StatusType;
	error: string | null;
}

interface Profile {
	profile_id: number | null;
	user_id: number | null;
	bio: string;
	picture_url: string;
	location: string;
	linkedin_url: string;
	github_url: string;
	profile_view: number;
	contest_attending: number;
	problem_solved: number;
	date_of_birth: string;
}

interface UserState {
	username: string;
	email: string;
	registraion_date: string;
	profile: Profile;
	meta: Meta;
	role: string;
}

const initialState: UserState = {
	username: "",
	email: "",
	registraion_date: "",
	profile: {
		profile_id: null as number | null,
		user_id: null as number | null,
		bio: "",
		picture_url: "",
		location: "",
		linkedin_url: "",
		github_url: "",
		profile_view: 0,
		contest_attending: 0,
		problem_solved: 0,
		date_of_birth: "",
	},
	meta: {
		status: "idle",
		error: null,
	},
	role: "",
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		logout(state) {
			Object.assign(state, initialState);
		},
		setUserData(state, action: PayloadAction<Partial<UserState>>) {
			Object.assign(state, { ...state, ...action.payload });
		},
	},
});

export const { logout, setUserData } = loginSlice.actions;
export default loginSlice.reducer;

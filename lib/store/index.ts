import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { loadState, saveState } from "./localStorage";

const preloadedState = typeof window !== "undefined" ? loadState() : undefined;

export const store = configureStore({
	reducer: rootReducer,
	preloadedState,
	devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(() => {
	saveState({
		login: store.getState().login,
		problem: store.getState().problem,
		discussion: store.getState().discussion,
		learningMaterial: store.getState().learningMaterial,
	});
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

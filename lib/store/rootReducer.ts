import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import problemReducer from "./slices/problemSlice";
import discussionReducer from "./slices/discussionSlice";
import learningMaterialReducer from "./slices/learningMaterialSlice";

const appReducer = combineReducers({
	login: loginReducer,
	problem: problemReducer,
	discussion: discussionReducer,
	learningMaterial: learningMaterialReducer,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === "RESET_STATE") {
		state = undefined;
	}
	return appReducer(state, action);
};

export { rootReducer };

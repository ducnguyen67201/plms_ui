import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import counterReducer from "./slices/counterSlice";
import problemReducer from "./slices/problemSlice";

const appReducer = combineReducers({
	login: loginReducer,
	counter: counterReducer,
	problem: problemReducer,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === "RESET_STATE") {
		state = undefined;
	}
	return appReducer(state, action);
};

export { rootReducer };

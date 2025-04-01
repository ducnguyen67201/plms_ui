import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import counterReducer from "./slices/counterSlice";

const appReducer = combineReducers({
	login: loginReducer,
	counter: counterReducer,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === "RESET_STATE") {
		state = undefined;
	}
	return appReducer(state, action);
};

export { rootReducer };

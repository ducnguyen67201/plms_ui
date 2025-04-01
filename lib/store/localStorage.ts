export const loadState = () => {
	try {
		const serializedState = localStorage.getItem("reduxState");
		if (!serializedState) return undefined;
		return JSON.parse(serializedState);
	} catch (err) {
		console.warn("Failed to load state:", err);
		return undefined;
	}
};

export const saveState = (state: any) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("reduxState", serializedState);
	} catch (err) {
		console.warn("Failed to save state:", err);
	}
};

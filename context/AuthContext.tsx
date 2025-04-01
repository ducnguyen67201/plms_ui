"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";

interface AuthContextType {
	user: { token: string } | null;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<{ token: string } | null>(null);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setUser({ token });
		}
		setLoading(false);
	}, []);

	const login = (token: string) => {
		localStorage.setItem("token", token);
		document.cookie = `token=${token}; path=/`;
		setUser({ token });
	};

	const logout = () => {
		localStorage.removeItem("token");
		document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		dispatch({ type: "RESET_STATE" });
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

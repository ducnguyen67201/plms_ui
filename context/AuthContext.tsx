"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

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

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setUser({ token });
		}
	}, []);

	const login = (token: string) => {
		localStorage.setItem("token", token);
		document.cookie = `token=${token}; path=/`;
		setUser({ token });
	};

	const logout = () => {
		localStorage.removeItem("token");
		document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

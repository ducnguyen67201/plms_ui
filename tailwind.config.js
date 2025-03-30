/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#5A55F3",
				secondary: "#2D1E40",
				accent: "#E3645B",
				background: "#FFFFFF",
				surface: "#E8EAF6",
				textDark: "#1E1E28",
				textLight: "#7E7D94",
				highlight: "#C49F3F",
			},
		},
	},
	plugins: [],
};

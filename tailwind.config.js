/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xs: "454px",
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				mainBackground: "#343541",
				darkPrimary: "#1F1F1F",
				darkSecondary: "#2b2b2b",
				darkBackground: "#020617",
				darkBackgroundSecondary: "#0F172A",
				green: "#4ADE80",
				disabled: "#9CA3AF",
				botBackground: "#334155",
				textSecondary: "#D1D5DB",
			},
		},
	},
	plugins: [],
};

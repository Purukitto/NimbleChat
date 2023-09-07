/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
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

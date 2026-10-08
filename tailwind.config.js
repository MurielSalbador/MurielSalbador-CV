/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				ink: { DEFAULT: "#08080a", 50: "#0f0f12", 100: "#141418", 200: "#1c1c22" },
				bone: "#f2f1ec",
				acid: "#d4ff4f",
			},
			fontFamily: {
				sans: ["Geist", "system-ui", "sans-serif"],
				serif: ['"Instrument Serif"', "Georgia", "serif"],
				mono: ['"Geist Mono"', "ui-monospace", "monospace"],
			},
			transitionTimingFunction: {
				expo: "cubic-bezier(0.22, 1, 0.36, 1)",
			},
		},
	},
	plugins: [],
}

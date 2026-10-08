/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				ink: { DEFAULT: "#0c0709", 50: "#120b0e", 100: "#181014", 200: "#22161b" },
				sand: { DEFAULT: "#ead7c3", 200: "#cdb8a4", 400: "#9c8a7b" },
				rose: { DEFAULT: "#ff4f93", 300: "#ff8ab8", 600: "#d6286f", 900: "#4a0f24" },
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				display: ['"Bodoni Moda"', "Georgia", "serif"],
				script: ['"Mrs Saint Delafield"', "cursive"],
				mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
			},
			keyframes: {
				marquee: {
					from: { transform: "translate3d(0, 0, 0)" },
					to: { transform: "translate3d(-50%, 0, 0)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				blink: { "50%": { opacity: "0" } },
				"spin-slow": { to: { transform: "rotate(360deg)" } },
			},
			animation: {
				marquee: "marquee 35s linear infinite",
				float: "float 6s ease-in-out infinite",
				blink: "blink 1s step-end infinite",
				"spin-slow": "spin-slow 30s linear infinite",
			},
		},
	},
	plugins: [],
}

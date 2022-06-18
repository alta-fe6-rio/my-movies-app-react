/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter'],
				oswald: ['Oswald'],
				rubik: ['Rubik'],
				sans: ['Helvetica', 'Arial', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // On utilisera une classe 'dark' pour le mode sombre
  theme: {
    extend: {},
  },
  plugins: [],
};

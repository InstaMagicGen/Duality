/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: 'class', // pour le toggle Dark/Light
  theme: {
    extend: {
      colors: {
        duality: '#6B5B95', // violet premium
        soulset: '#FF6F61', // corail premium
        gold: '#EAB308',    // gold Tailwind custom
      },
    },
  },
  plugins: [],
}

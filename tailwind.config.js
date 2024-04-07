/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'default-orange' : '#FF9B50',
          'hover-orange' : '#E25E3E',
        }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#fffcf2',
        'dark-brown': '#574534',
        'dark-blue': '#304254',
      },
      fontFamily: {
        'work-sans': ['Work Sans', 'sans-serif'],
        'the-youngest': ['The Youngest', 'serif'],
      },
    },
  },
  plugins: [],
}

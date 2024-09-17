/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#2445F2',
        gray: '#777777',
        green: '#50C878',
      }
    },
  },
  plugins: [],
}


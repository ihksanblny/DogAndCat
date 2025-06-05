/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#69DDFF",
        primaryLight: "#96CDFF",
        primaryLighter: "#D8E1FF",
        accent: "#DBBADD",
        accentDark: "#BE92A2",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

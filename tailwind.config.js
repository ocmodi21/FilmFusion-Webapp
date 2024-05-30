/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Urbanist", "sans-serif"],
    },
    colors: {
      bgcolor: "#121212",
      main: "#892CDC",
      font: "#ffffff",
    },
    extend: {},
  },
  plugins: [],
};

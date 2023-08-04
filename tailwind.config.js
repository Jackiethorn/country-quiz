/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.jsx",
    "./components/**/*.{html,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F2F2F2",
        secondary: "#2F527B",
        tertiary: "#6066D0CC",
        danger: "#EA8282",
        success: "#60BF88",
        warning: "#F9A826",
      },
      backgroundImage: {
        main: "url('/background.png')",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

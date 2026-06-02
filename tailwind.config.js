/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["var(--font-kanit)", "Kanit", "sans-serif"],
      },
      colors: {
        ink: "#0C0C0C",
        mist: "#D7E2EA",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#121411", 
        "background-light": "#F2F4F1", // Slightly darker off-white to contrast with the grouping cards
        "background-dark": "#121212",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E1E1E",
        "tint-green": "#404e27",
        "tint-green-light": "#E9ECE6", 
        "tint-green-hover": "#4d5e2f",
        "gray-text": "#5C5E5A",
        "gray-text-light": "#A1A1AA"
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      boxShadow: {
          'soft': '0 8px 30px -4px rgba(64, 78, 39, 0.08)',
          'card': '0 2px 10px -2px rgba(0, 0, 0, 0.03)',
          'nav': '0 -4px 20px rgba(0,0,0,0.03)',
      },
    },
  },
  plugins: [],
};

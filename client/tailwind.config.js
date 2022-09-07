/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Color1: "#FFE74C",
        // Color2: "#D9D9D9",
        // Color3: "#FCDA00",
        Color1: "#54e362",
        Color2: "#D9D9D9",
        Color3: "#FCDA00",
        Color4: "#ffffff"
      },
      screens: {
        max500: { max: "500px" },
        max400: { max: "400px" },
      },
    },
  },
  plugins: [],
};

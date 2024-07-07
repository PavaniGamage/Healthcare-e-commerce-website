/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // Adding the Outfit font
      },
      colors: {
        lightBlue: "#01A3FF", // Adding lightBlue color
        bgBlue: "#E9F7FF",
        darkBlue: "#0097ED",
        darkYellow: "#F2AE00",
      },
    },
  },
  plugins: [],
};

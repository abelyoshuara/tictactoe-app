/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Figtree", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};

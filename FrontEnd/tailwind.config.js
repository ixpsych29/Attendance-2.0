/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/tw-elements-react/dist/js/**/*.js",
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [require("tw-elements-react/dist/plugin.cjs")],
// };

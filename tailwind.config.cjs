/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["dracula"],
  },
};

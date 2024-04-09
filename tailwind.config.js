const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.md",
    "./src/**/*.liquid",
    "./src/**/*.njk",
    "./src/**/*.html",
    "./.eleventy.js",
  ],
  theme: {
    extend: {
      screens: {
        "2-xl": "1700px",
      },
      colors: {
        purple_heart: {
          DEFAULT: "#4E14B3",
        },
        salmon: {
          DEFAULT: "#FC9BA6",
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fc9ba6",
          400: "#fa7285",
          500: "#f3405d",
          600: "#df1f47",
          700: "#bd133b",
          800: "#9e1339",
          900: "#871436",
          950: "#4b0618",
        },
      },
      fontFamily: {
        tropic: ["Tropi Land", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

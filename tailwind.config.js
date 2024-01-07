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
        branding: {
          DEFAULT: "#e60049",
          600: "#C7003F",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    enabled: process.env.NETLIFY,
    content: ["./src/**/*.md", "./src/**/*.liquid", "./src/**/*.html", "./.eleventy.js"],
  },
  theme: {
    extend: {
      screens: {
        '2-xl': '1700px'
      },
      colors: {
        yellowish: {
          "DEFAULT": "#f1c71a",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};

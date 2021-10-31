const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    enabled: process.env.NETLIFY,
    content: ["./src/**/*.md", "./src/**/*.liquid", "./src/**/*.njk", "./src/**/*.html", "./.eleventy.js"],
  },
  theme: {
    extend: {
      screens: {
        '2-xl': '1700px'
      },
      colors: {
        branding: {
          "DEFAULT": "#e60049",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    }
  },
  plugins: [],
};

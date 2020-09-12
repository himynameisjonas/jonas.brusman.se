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
        cabaret: {
          50: '#FEF6F8',
          100: '#FDEDF1',
          200: '#FBD1DB',
          300: '#F9B5C5',
          400: '#F47E9A',
          500: '#EF476F',
          600: '#D74064',
          700: '#8F2B43',
          800: '#6C2032',
          900: '#481521',
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

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
        blagra: {
          50: '#F4F7F8',
          100: '#E9EEF2',
          200: '#C8D5DE',
          300: '#A7BCCA',
          400: '#6489A2',
          500: '#22577A',
          600: '#1F4E6E',
          700: '#143449',
          800: '#0F2737',
          900: '#0A1A25',
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

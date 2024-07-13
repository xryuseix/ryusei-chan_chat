module.exports = {
  content: [
    "./src/**/*.{html,jsx,tsx}",
    "./node_modules/@rewind-ui/core/dist/theme/styles/*.js",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#E5F6FF",
          100: "#CCECFF",
          200: "#94D8FF",
          300: "#61C5FF",
          400: "#2EB2FF",
          500: "#009EF7",
          600: "#007EC7",
          700: "#005E94",
          800: "#003D61",
          900: "#002033",
          950: "#001019",
        },
      },
    },
  },
};

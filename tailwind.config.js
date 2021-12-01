const colors = require("tailwindcss/colors");

module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // flex: {
      //   2: "2 2 0%",
      //   3: "3 3 0%",
      // },
      minWidth: {
        none: "none",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      maxWidth: {
        container: 1280,
      },
      fontFamily: {
        sans: ['"Quicksand"'], // default font
        // sans: ['"FoundryGridnik"'], // default font
        // helvetica: "Helvetica",
      },
      colors: {
        ...colors,
        primaryBlue: "#26358B",
        primaryDarkBlue: "#13295C",
        lightGreen: "#E7FEFB",

        // primaryGray: {
        //   100: "#F5F5F5",
        //   200: "#E2E4E6",
        //   300: "#BDBEBF",
        //   400: "#A8ADB4",
        //   500: "#6E767E",
        //   700: "#363839",
        // },
      },
      spacing: {
        container: 1280,
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover"],
      backgroundColor: ["active", "even"],
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};

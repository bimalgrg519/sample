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
      // fontFamily: {
      //   sans: ["Quicksand"],
      // },
      // colors: {
      //   transparent: "transparent",
      //   current: "currentColor",
      //   primaryBlue: "#3B648D",
      //   primaryBlueLight: "#f0f7ff",
      //   primaryYellow: "#D9BF45",
      //   primaryYellowDark: "#b59e38",
      //   primaryGreen: "#69B578",
      //   primaryGray: {
      //     100: "#F5F5F5",
      //     200: "#E2E4E6",
      //     300: "#BDBEBF",
      //     400: "#A8ADB4",
      //     500: "#6E767E",
      //     700: "#363839",
      //   },
      // },
      spacing: {
        container: 1280,
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};

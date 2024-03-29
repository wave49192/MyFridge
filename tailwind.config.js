/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", , "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: { min: "320px", max: "426px" },
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
    colors: {
      primary: "#EE7214",
      "primary-content": "#F7B787",
      "primary-2": "#F9E8D9",
      secondary: "#527853",
      accent: "#362706",
      neutral: "#3D4451",
      "base-100": "#FFFFFF",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      white: "#FFFFFF",
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        emmy: {
          primary: "#EE7214",
          "primary-content": "F7B787",
          "primary-bg": "F9E8D9",
          secondary: "#527853",
          accent: "#362706",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        },
      },
      "light",
      "dark",
      "bumblebee",
      "cupcake",
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};

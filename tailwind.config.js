import tailwindcssAnimated from "tailwindcss-animated";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
      },
      colors:{
        primary: "#dae7d2 ",
        secondary: "#b0b5ad",
        tertiary: "#20C3C7",
        quaternary: "#FF872C",
        quinary: "#4875F7",
        septenary: "#343A40",
        octanary: "#FFB900",
        nonanary: "#AED6E3",
        decanary: "#9F798C",
        undecanary: "#E91E63",
        duodecanary: "#63C2DE",
        treodecanary: "#FFC300",
        tetradecanary: "#457B9D",
        pentadecanary: "#FF6347",
        hexadecanary: "#212121",
      }
    },
  },
  plugins: [tailwindcssAnimated],
};
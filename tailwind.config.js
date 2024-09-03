/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: "'Josefin Sans'",
      },
      colors: {
        "light-body": "hsla(var(--light-background))",
        "dark-body": "hsla(var(--dark-background))",
        main: "hsla(var(--text-main))",
        "circle-color": "hsla(var(--circle-color))",
        strike: "hsla(var(--strike))",
        off: "hsla(var(--off))",
      },
    },
  },
  plugins: [],
};

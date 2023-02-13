/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      regular: "Rubik_400Regular",
    },
    extend: {
      colors: {
        purple: {
          500: "#7F45E2",
          700: "#975DFA",
          900: "#462878",
        },
        gray: {
          100: "#EBEBEB",
          500: "#6B6B6B",
          900: "#2D2A37",
        },
        background: "#181823",
      },
    },
  },
  plugins: [],
};

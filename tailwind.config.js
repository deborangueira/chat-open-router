/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta inspirada na estética do Claude: fundo bege quente e
        // acento terracota. Sinta-se livre para ajustar depois.
        cream: {
          50: "#FBFAF7",
          100: "#F5F3EE",
          200: "#EDE9E0",
          300: "#DFD9CB",
        },
        ink: {
          800: "#30302E",
          900: "#1F1E1D",
          950: "#141413",
        },
        accent: {
          DEFAULT: "#C96442",
          light: "#DE8A6D",
          dark: "#A8502F",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};

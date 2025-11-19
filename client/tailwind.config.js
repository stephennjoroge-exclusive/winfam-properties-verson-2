// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ['Bodoni Moda', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#081A51',
        'box': 'rgba(255,255,255,0.18)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

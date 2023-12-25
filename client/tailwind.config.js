/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
      },
      backgroundImage: {
        'dotted-pattern': "url('/src/assets/images/dotted-pattern.png')",
      },
    },
  },
  plugins: [],
};

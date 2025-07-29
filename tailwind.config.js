/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulseBorder: 'pulseBorder 2s infinite',
      },
      keyframes: {
        pulseBorder: {
          '0%, 100%': {
            boxShadow: '0 0 0 2px #4A90E2',
          },
          '50%': {
            boxShadow: '0 0 0 4px rgba(74, 144, 226, 0.5)',
          },
        },
      },
    },
  },
  plugins: [],
};

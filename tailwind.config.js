/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '48': '12rem',
      },
      borderRadius: {
        'full': '9999px',
        'lg': '0.5rem',
      },
      dropShadow: {
        'md': '0 4px 3px rgb(0 0 0 / 0.07)',
        'lg': '0 10px 8px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
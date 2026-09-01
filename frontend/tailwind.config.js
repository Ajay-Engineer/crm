/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38b6ff', // Exact HIG Sky Blue
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#082f49',
          950: '#041d2e',
        },
        surface: {
          light: '#FFFFFF',
          soft: '#F4F9FD',
          hover: '#EAF4FC',
          border: '#D8E8F5',
        },
        navy: {
          800: '#1E293B',
          900: '#0B132B',
          950: '#060A17',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(56, 182, 255, 0.08), 0 4px 16px -4px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(56, 182, 255, 0.18), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
        'glow': '0 0 20px -3px rgba(56, 182, 255, 0.35)',
        'glow-lg': '0 0 35px -5px rgba(56, 182, 255, 0.5)',
      }
    },
  },
  plugins: [],
}

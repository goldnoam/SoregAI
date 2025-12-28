/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
        display: ['Rubik', 'sans-serif'],
      },
      colors: {
        wool: {
          50: '#fdfbf7',
          100: '#f7f3e8',
          200: '#efe5cd',
          300: '#e5d1a8',
          400: '#dab67d',
          500: '#d09b58',
          600: '#c38043',
          700: '#a26437',
          800: '#855132',
          900: '#6d432b',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c5d8c5',
          300: '#9dbf9d',
          400: '#76a076',
          500: '#578257',
          600: '#436643',
          700: '#375237',
          800: '#2e412e',
          900: '#263626',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'stitch-pulse': 'stitchPulse 2s ease-in-out infinite',
        'stitch-dance': 'stitchDance 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        stitchPulse: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.05)' },
        },
        stitchDance: {
          '0%': { transform: 'translateY(0) scale(1)', filter: 'brightness(1)' },
          '30%': { transform: 'translateY(-3px) scale(1.15)', filter: 'brightness(1.3)' },
          '100%': { transform: 'translateY(0) scale(1)', filter: 'brightness(1)' },
        }
      }
    }
  },
  plugins: [],
};
tailwind.config = {
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
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  }
}
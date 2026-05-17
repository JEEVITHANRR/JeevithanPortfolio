/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        cream: '#F7F7F5',
        frost: '#ECECEC',
        silver: '#E2E2E2',
        maroon: {
          deep: '#4A0E0E',
          royal: '#6D1F1F',
          crimson: '#B22222',
          velvet: '#8B0000',
        },
        charcoal: '#1A1A1A',
        slate: '#5C5C5C',
      },
      boxShadow: {
        luxury: '0 8px 40px rgba(74,14,14,0.12)',
        'luxury-lg': '0 20px 80px rgba(74,14,14,0.18)',
        glass: '0 4px 24px rgba(0,0,0,0.06)',
        'glass-lg': '0 12px 48px rgba(0,0,0,0.1)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold:   { DEFAULT:'#D4AF37', light:'#F5D76E', dark:'#A8870A', glow:'rgba(212,175,55,0.35)' },
        silver: { DEFAULT:'#C0C0C0', light:'#E8E8E8', dark:'#909090' },
        bg:     { deep:'#05080F', dark:'#0A0F1E', card:'#0D1426', surface:'#111827' },
      },
      fontFamily: {
        display: ['Cormorant Garamond','serif'],
        body:    ['DM Sans','sans-serif'],
        price:   ['Bebas Neue','cursive'],
        cinzel:  ['Cinzel','serif'],
      },
      animation: {
        shimmer:     'shimmer 4s linear infinite',
        fadeInUp:    'fadeInUp .7s ease forwards',
        float:       'float 4s ease-in-out infinite',
        ring:        'ring 1.8s ease-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        ticker:      'ticker 30s linear infinite',
        borderGlow:  'borderGlow 2.5s ease-in-out infinite',
        gradShift:   'gradientShift 12s ease infinite',
        orbit:       'orbit 14s linear infinite',
      },
      backgroundImage: {
        'gold-grad':  'linear-gradient(135deg,#A8870A,#D4AF37,#F5D76E)',
        'gold-h':     'linear-gradient(90deg,#A8870A,#D4AF37,#F5D76E)',
        'dark-grad':  'linear-gradient(135deg,#05080F,#0A0F1E,#1E293B)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(212,175,55,.35)',
        'gold-lg':'0 0 60px rgba(212,175,55,.25), 0 20px 60px rgba(0,0,0,.6)',
      },
    },
  },
  plugins: [],
}

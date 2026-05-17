/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50:  '#e8eaed',
          100: '#c5c9d0',
          200: '#9fa6b3',
          300: '#788395',
          400: '#5b6680',
          500: '#3d4a6a',
          600: '#2d3855',
          700: '#1c2540',
          800: '#0f1629',
          900: '#080d1a',
          950: '#040810',
        },
        cyan: {
          glow: '#00f5ff',
          dim:  '#00b8c4',
        },
        violet: {
          glow: '#bf5fff',
          dim:  '#8b2fc9',
        },
      },
      fontFamily: {
        brutal: ['Space Grotesk', 'sans-serif'],
        mono:   ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'orbit':      'orbit 20s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'flicker':    'flicker 3s ease-in-out infinite',
        'marquee':    'marquee 30s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanline':   'scanline 8s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.85 },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,245,255,0.4), 0 0 30px rgba(0,245,255,0.1)' },
          '50%':      { boxShadow: '0 0 20px rgba(0,245,255,0.8), 0 0 60px rgba(0,245,255,0.3)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neumorphic-dark':  '6px 6px 16px rgba(0,0,0,0.6), -4px -4px 12px rgba(255,255,255,0.02)',
        'neumorphic-inset': 'inset 4px 4px 10px rgba(0,0,0,0.5), inset -2px -2px 8px rgba(255,255,255,0.03)',
        'cyan-glow':        '0 0 20px rgba(0,245,255,0.5), 0 0 60px rgba(0,245,255,0.15)',
        'violet-glow':      '0 0 20px rgba(191,95,255,0.5), 0 0 60px rgba(191,95,255,0.15)',
        'card-hover':       '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,245,255,0.1)',
      },
    },
  },
  plugins: [],
}

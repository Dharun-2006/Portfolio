/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent:  '#00F0FF',
        glow:    '#3B82F6',
        dark:    '#030712',
        surface: '#060F24',
        card:    '#0A1628',
        text:    '#DBEAFE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'blob':        'blob 8s ease-in-out infinite',
        'blob-delay':  'blob 10s ease-in-out infinite 2s',
        'blob-delay2': 'blob 12s ease-in-out infinite 4s',
        'blink':       'blink 1s step-end infinite',
        'scan-line':   'scanLine 3s linear infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(37,99,235,0.5), 0 0 40px rgba(37,99,235,0.2)' },
          '50%':     { boxShadow: '0 0 40px rgba(37,99,235,0.9), 0 0 80px rgba(0,240,255,0.4)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-16px)' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-20px) scale(1.1)' },
          '66%':     { transform: 'translate(-20px,15px) scale(0.95)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        scanLine: {
          '0%':   { top: '-2px' },
          '100%': { top: '100%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}

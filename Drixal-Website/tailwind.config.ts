import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,ts}',
    './pages/**/*.vue',
    './app.vue',
    './composables/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#050b1f', 2: '#0a1433', 3: '#071545' },
        brand: { blue: '#0a4bff', cyan: '#00c8ff', sky: '#5ee1ff', periwinkle: '#8fb0ff' },
        // Semantic tokens as RGB channels → dark mode swaps via html.dark CSS vars.
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        mist: 'rgb(var(--c-mist) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        field: 'rgb(var(--c-field) / <alpha-value>)',
        hero: 'rgb(var(--c-hero) / <alpha-value>)',
        'section-a': 'rgb(var(--c-section-a) / <alpha-value>)',
        'section-b': 'rgb(var(--c-section-b) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Almarai', 'system-ui', 'sans-serif'],
        ar: ['Almarai', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        brand: 'linear-gradient(135deg,#0a4bff,#00c8ff)',
        'brand-text': 'linear-gradient(90deg,#5ee1ff,#8fb0ff)',
      },
      boxShadow: {
        brand: '0 10px 30px -8px rgba(10,75,255,.6)',
        'brand-lg': '0 24px 50px -20px rgba(10,75,255,.5)',
        form: '0 30px 60px -35px rgba(10,30,100,.35)',
      },
      keyframes: {
        float: { '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '50%': { transform: 'translate(-50%,-50%) scale(1.12)', opacity: '.8' } },
        drift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.08)' },
          '66%': { transform: 'translate(-30px,25px) scale(.95)' },
        },
        scrollDot: { '60%': { transform: 'translateY(14px)', opacity: '0' } },
        toastIn: { from: { transform: 'translateY(16px)', opacity: '0' } },
        fadeUp: { from: { transform: 'translateY(18px)', opacity: '0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite reverse',
        'scroll-dot': 'scrollDot 1.6s infinite',
        'toast-in': 'toastIn .35s cubic-bezier(.2,.7,.2,1)',
        // CSS-only entrance for above-the-fold content (visible without JS)
        'fade-up': 'fadeUp .8s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
} satisfies Config

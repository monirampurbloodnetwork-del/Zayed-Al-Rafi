/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080D18',
          900: '#0B1020',
          800: '#101830',
        },
        electric: {
          DEFAULT: '#4D8DFF',
          soft: '#77D9FF',
        },
        ink: {
          primary: '#F5F7FC',
          secondary: '#A7B1C4',
          muted: '#6E7A92',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Hind Siliguri"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        bangla: ['"Hind Siliguri"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 64px -16px rgba(2, 6, 18, 0.72), inset 0 1px 0 0 rgba(255, 255, 255, 0.09)',
        glow: '0 0 36px -8px rgba(77, 141, 255, 0.42)',
      },
    },
  },
  plugins: [],
};

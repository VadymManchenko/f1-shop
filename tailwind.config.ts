import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f7',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#999999',
          400: '#666666',
          500: '#333333',
          600: '#1a1a1a',
          700: '#101010',
          800: '#0a0a0a',
          900: '#000000',
        },
        accent: {
          ferrari: '#DC0000',
          mercedes: '#00D2BE',
          redbull: '#1E41FF',
          mclaren: '#FF8700',
          alpine: '#0090FF',
          aston: '#006F62',
          williams: '#005AFF',
          haas: '#B6BABD',
          rb: '#6692FF',
          sauber: '#52E252',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.16em',
      },
    },
  },
  plugins: [],
};

export default config;

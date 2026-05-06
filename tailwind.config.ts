import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'charbon': '#111111',
        'surface': '#1C1C1C',
        'braise': '#F4821F',
        'braise-dark': '#D96E0A',
        'lumiere': '#F0EDE8',
        'fumee': '#8B8680',
        'rouge-alerte': '#C0392B',
        'vert-ok': '#27AE60',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config

import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        roseGold: '#e0bfb8',
        sidebar: '#D8D7D9',
        sidebarText: '#592828',
        adminPage: '#F5F5F5',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #bf7b75 0%, #e0bfb8 100%)',
      },
    },
    screens: {
      sm: '766px',
      md: '766px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [nextui()],
}

export default config

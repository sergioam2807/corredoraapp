import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Tangerine as FontTangerine,
} from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const fontTangerine = FontTangerine({
  subsets: ['latin'],
  variable: '--font-tangerine',
  weight: ['400', '700'],
})

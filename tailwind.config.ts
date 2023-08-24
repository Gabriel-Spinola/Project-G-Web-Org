import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {

    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'x1': '1280px',
      '2x1': '1536px',
    }
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ttransparent: 'transparent',
      black: '#000',
      'darker-gray': '#202020',
      'medium-gray': '#242424',
      'light-gray': '#262626',

      'darker-white': '#ebebeb',
      'medium-white': '#f5f5f5',
      'light-white': '#fafafa',
      'pure-white': '#fff',

      'darker-primary': '#E5684A',
      'medium-primary': '#F06D4D',
      'light-primary': '#FF7452',

      'darker-secundary': '#6EC23A',
      'medium-secundary': '#74CC3D',
      'light-secundary': '#7AD640',

      'darker-tertiary': '#E836F5',
      'medium-tertiary': '#F238FF',
      'light-tertiary': '#F34DFF',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      x1: '1280px',
      '2x1': '1536px',
    },
  },
  plugins: [],
}
export default config

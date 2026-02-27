import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#121212',
        deep: '#1a1a1a',
        gold: '#d4af5f'
      },
      boxShadow: {
        glow: '0 10px 30px rgba(212,175,95,.15)'
      }
    }
  },
  plugins: []
};

export default config;

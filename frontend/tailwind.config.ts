import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#0E1E5B', 
        'secondary': '#091442',
        'tertiary': '#3562A6', 
        'fourth' : '#6594C0',
        'fifth' : '#0B0B0B'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        custom: ['GamesPage', 'sans-serif'],
        custom2: ['GameHeader', 'sans-serif'],
        custom3: ['GameDescription', 'sans-serif']
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

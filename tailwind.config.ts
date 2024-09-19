import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "off-white": "#DDE6ED",
        "theme-1" : {
          "pacific-cyan" :"#06AED5",
          "cerulean" : "#086788",
          "jonquil": "#f0c808",
          "papaya-whip": "#FFF1D0",
          "rojo": "#DD1C1A"
        },

        "theme-2": {
          "pantone": "#E63946",
          "honeydew": "#F1FAEE",
          "non-photo-blue": "#A8DADC",
          "cerulean": "#457B9D",
          "berkeley-blue": "#1D3557"
        },
        "dark-mode-1" : {
          "matte-black": "#2C3333",
          "dull-dk-blue": "#395B64",
          "dull-light-blue": "#A5C9CA",
          "blue-white": "#E7F6F2"
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
export default config;

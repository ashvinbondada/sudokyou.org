import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-inner': 'inset 0 0 10px rgba(0, 0, 0, 0.2)', // Custom inner shadow
      },
      keyframes: {
        pulseShadow: {
          '0%, 100%': { boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)' }, // start and end with custom-inner
          '50%': { boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)' }, // halfway with custom-inner-hover
        },
      },
      animation: {
        'pulse-shadow': 'pulseShadow 1s ease-in-out infinite', // 2s duration with infinite looping
      },
      colors: {
        "light": {
          "given": "#000000", // black
          "wrong": "#dc2626", // red-400
          "right": "#1E3A8A", // blue 
          "border": "#086788", // pacific-cyan blue
          "grid-line": "#086788",  // pacific-cyan blue
          "reg-line": "#086788", // cerulean
          "square": "#F3F4F6", // gray-100
          "nbhd-highlight": "#E5E7EB", // dull blue
          "same-num-highlight": "#FFDE64", // jonquil-yellow
          "notebox-hover": "#FFDE64", // 
          "same-num-notebox": "#FFDE64",
          "anchor": "#06AED5",
          "selected-cell": "#06AED5",
        },
        "dark": {
          "given": "#9DB2BF",
          "wrong": "#dc2626",
          "right": "#06AED5",
          "border": "#06AED5",
          "grid-line": "#06AED5",
          "reg-line": "#1D3557",
          "square": "",
          "nbhd-highlight": "",
          "same-num-highlight": "",
          "notebox-hover": "",
          "same-num-notebox": "",
          "anchor": "#A480CF",
          "selected-cell": "#A480CF",
        },
        "shilpa-aqua": "#A8E6CF",
        "shilpa-pink": "#FFD1DC",
        "shilpa-ivy-green": "#6B8E23",
        "off-white": "#DDE6ED",
        "off-white-2": "#EDEFED",
        "off-white-3": "#DCE3E7",
        "editable-num" : "#1E3A8A",
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
        },
        "dark-mode-2": {
          "dk-blue": "#27374D",
          "matte-blue":"#526D82",
          "dull-grey-blue": "#9DB2BF",
          // off white theme is general

        }

      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
export default config;

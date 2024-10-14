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
          '50%': { boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.5)' }, // halfway with custom-inner-hover
        },
        pulseShadowNotes: {
          '0%, 100%': { boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)' }, // start and end with custom-inner
          '50%': { boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)' }, // halfway with custom-inner-hover
        },
      },
      animation: {
        'pulse-shadow': 'pulseShadowNotes 0.8s ease-in-out infinite', // 2s duration with infinite looping
        'pulse-shadow-note': 'pulseShadowNotes 1.5s ease-in-out infinite', // 2s duration with infinite looping
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
          "given": "#F3F4F6",
          "wrong": "#dc2626",
          "right": "#84D2F6",
          "grid-line": "#06AED5",
          "reg-line": "#1D3557",
          "square": "#020617",
          "nbhd-highlight": "#0f172a",
          "same-num-highlight": "#64748B",
          "notebox": "#e2e8f0",
          "notebox-hover": "#64748B",
          "same-num-notebox": "#64748B",
          "anchor": "#A480CF",
          "selected-cell": "#A480CF",
        },
        "theme-1" : {
          "pacific-cyan" :"#06AED5",
          "cerulean" : "#086788",
        },
        "dark-mode-2": {
          "dull-grey-blue": "#9DB2BF",
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
export default config;

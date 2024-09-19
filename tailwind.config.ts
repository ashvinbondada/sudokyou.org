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
        "theme-1" : {
          "pacific-cyan" :"#06AED5",
          "cerulean" : "#086788",
          "jonquil": "#f0c808",
          "papaya-whip": "FFF1D0",
          "rojo": "DD1C1A"
        },

        "theme-2": {
          "pantone": "#E63946",
          "honeydew": "#F1FAEE",
          "non-photo-blue": "#A8DADC",
          "cerulean": "#457B9D",
          "berkeley-blue": "#1D3557"
        }
       
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
export default config;

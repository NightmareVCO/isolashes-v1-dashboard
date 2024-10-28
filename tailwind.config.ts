import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPink: "#F4D9E5",
        grayBackground: "#F8F5F4",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#DBB568",
            secondary: "#C19843",
          },
        },
      },
    }),
  ],
};
export default config;

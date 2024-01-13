import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "neutral-content": "#050617"
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "neutral-content": "#ffff"
        },
      },
      "light",
      "dark"
    ],
  },
}
export default config

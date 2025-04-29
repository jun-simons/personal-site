import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ['InputMonoRegular', 'Arial', 'sans-serif'],
        mono: ["InputMonoLight", "Menlo", "Consolas", "Courier New", "monospace"],
        monoreg: ["InputMonoRegular", "Menlo", "Consolas", "Courier New", "monospace"]
      }
    },
  },
  plugins: [],
} satisfies Config;

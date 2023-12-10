/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        '12': '3rem',
      }
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['PPAcma'],
      'display-lite': ['Roslindale'],
      'body': ["Georgia"],
    },
  },
  plugins: [],
}


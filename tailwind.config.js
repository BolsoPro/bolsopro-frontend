/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Path to the Tremor module
    "./node_modules/@tremor/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(red|green|blue|yellow|indigo|purple|pink|gray|rose|emerald|teal|cyan|violet)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /text-(red|green|blue|yellow|indigo|purple|pink|gray|rose|emerald|teal|cyan|violet)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /border-(red|green|blue|yellow|indigo|purple|pink|gray|rose|emerald|teal|cyan|violet)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /fill-(red|green|blue|yellow|indigo|purple|pink|gray|rose|emerald|teal|cyan|violet)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
  ],
} 
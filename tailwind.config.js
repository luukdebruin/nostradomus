/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      normal: ['Borna_Regular'],
      medium: ['Borna_Medium'],
      chonky: ['Borna_Bold'],
    },
    extend: {},
  },
  plugins: [],
}

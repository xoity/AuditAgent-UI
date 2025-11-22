module.exports = {
  content: [
    './web/templates/**/*.html',
    './assets/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

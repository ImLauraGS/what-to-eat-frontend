/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "primary-color": "#6CBD98",
      "secondary-color": '#DCEAB2',
      "green-btn": "#C7D66D",
      "background-green":"#F5F8EB",
      "bg-dark-green":"#B3D6C6"
    },
  },
  plugins: [],
}
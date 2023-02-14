/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        IstokWeb: ["Istok Web", "sans-serif"],
        Itim : ["Itim", "cursive"],
      },
      colors: {
        'navy-blue': '#383D55',
        'primary-red': '#F6162E',
      },
    },
  },
  plugins: [require("daisyui")],
}

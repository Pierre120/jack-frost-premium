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
        'dark-navy-blue': '#36305E',
        'primary-red': '#F6162E',
        'close-icon': '#A2BCDD',
        'modal-backdrop': '#939393',
        'sky-blue': '#DDECFF',
      },
    },
  },
  plugins: [require("daisyui")],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        IstokWeb: ["Istok Web", "sans-serif"],
        Itim : ["Itim", "cursive"],
      }
    },
  },
  plugins: [require("daisyui")],
}

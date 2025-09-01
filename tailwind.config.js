/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kode: ["Kode Mono", "monospace"],
        lucky: ["Luckiest Guy", "cursive"],
        josefin: ["Josefin Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}
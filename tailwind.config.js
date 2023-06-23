/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {},
      backgroundImage: {
        'background': "url('/images/background.jpg')"
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "sm-13": "13px",
        "3xxl": "32px",
        "4xxl": "40px",
      },
      lineHeight: {
        121: "121%",
        100: "100%",
       
      },
      backgroundImage: {
     "font-gradient": 'linear-gradient(90deg, #00CA55 20.69%, #C3FF5A 58.36%)',
      },
      colors: {
        "light-white": "#f4f4f4",
        "old-silver": "#838383",
        "malachite": "#00ca55",
        "black-olive": "#3b3c3d",
        "light-green": "#043F1D",
        "vampire-black": "#0a0b0c",
      },
    },
  },
  plugins: [],
};

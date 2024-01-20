/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],                                  //the content property is used to specify the source files that Tailwind CSS should scan to generate its utility classes. 
  theme: {
    extend: {
      colors:{
        primary:"#1565D8",
        dark:{
          light:"#5A7184",
          hard:"#0D2436",
          soft:"#183B56",
        }
      },
      fontFamily:{
        opensans:['Open Sans', "sans-serif"],
        roboto:['Roboto', "sans-serif"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


// tailwind.config.js

/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme' // import the default theme from the tailwind library
// checkout the list found here: .\node_modules\tailwindcss\stubs\config.full.js
// or here: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js#L301

export default {
  content: [
    // this tells where our Tailwind styles are stored
    './index.html',
    './src/**/*.{vue, js, ts}'
  ], // this tells where our components are stored
  theme: {
    // this is where we can override tailwind's default styles
    extend: {
      // this is where we can add new styles to tailwind, buy extending rather then overriding the default styles
      fontFamily: {
        // we don't want to only offer Open Sans, but add it to the default fonts as the first option
        // if the font is not available, the browser will use the next font in the list
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans] // this is how we can add a new font to our project
      },
      colors: {
        // this is how we can add a new color to our project
        'brand-gray-1': '#dadce0', // were using "" because the color name has a dash in it, and JavaScript doesn't support dashes in property names
        'brand-blue-1': '#1967d2',
        'brand-blue-2': '#4285f4',
        'brand-green-1': '#137333'
      },
      boxShadow: {
        blue: '0 0 3px 3px #4285f4' // use this with shadow-blue
      }
    },
    plugins: []
  }
}

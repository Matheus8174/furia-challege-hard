const colors = require('./src/components/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
    fontFamily: {
      regular: 'Poppins_400Regular',
      medium: 'Poppins_500Medium',
      semibold: 'Poppins_600SemiBold'
    },
    colors
  },
  plugins: []
};

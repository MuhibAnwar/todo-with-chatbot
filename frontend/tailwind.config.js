/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bold primary colors
        'electric-blue': '#0066FF',
        'vibrant-orange': '#FF6B35',
        'electric-green': '#00FF88',
        'bright-yellow': '#FFD700',
        'hot-red': '#FF0033',
        
        // Background and text colors
        'dark-charcoal': '#2C2C2C',
        'pure-white': '#FFFFFF',
        'near-black': '#1A1A1A',
        
        // Extended color variations for depth
        'blue-50': '#E6F0FF',
        'blue-100': '#CCDDFF',
        'blue-200': '#99BBFF',
        'blue-300': '#6699FF',
        'blue-400': '#3377FF',
        'blue-500': '#0066FF',
        'blue-600': '#0052CC',
        'blue-700': '#003D99',
        'blue-800': '#002966',
        'blue-900': '#001433',
        
        'orange-50': '#FFF2EC',
        'orange-100': '#FFE5DA',
        'orange-200': '#FFCBA4',
        'orange-300': '#FFB06D',
        'orange-400': '#FF9637',
        'orange-500': '#FF6B35',
        'orange-600': '#CC562A',
        'orange-700': '#994020',
        'orange-800': '#662B15',
        'orange-900': '#33150A',
        
        'green-50': '#E6FFF5',
        'green-100': '#CCFFEB',
        'green-200': '#99FFDB',
        'green-300': '#66FFCB',
        'green-400': '#33FFBB',
        'green-500': '#00FF88',
        'green-600': '#00CC6D',
        'green-700': '#009952',
        'green-800': '#006637',
        'green-900': '#00331B',
      }
    },
  },
  plugins: [],
}
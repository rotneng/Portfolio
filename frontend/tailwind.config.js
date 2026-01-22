/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0e17',        
        'dark-card': '#111625',      
        'primary-purple': '#8a2be2', 
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(to right, #8a2be2, #d65db1)', 
        'hero-gradient': 'linear-gradient(to bottom right, #0a0e17, #130f40, #0a0e17)',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(138, 43, 226, 0.5)', 
      }
    },
  },
  plugins: [],
}
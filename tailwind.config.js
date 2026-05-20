/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        purple: {
          dark: '#12081f',
          light: '#b895ff',
          accent: '#8f43ff',
          neon: '#d5b8ff'
        }
      },
      boxShadow: {
        'purple-glow': '0 8px 28px rgba(143, 67, 255, 0.25)',
        'purple-glow-lg': '0 12px 40px rgba(143, 67, 255, 0.35)'
      }
    }
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        koi: {
          bg: "#F8F5F1",      // marfil cálido
          card: "#FFFFFF",
          ink: "#1F2937",     // gris casi negro
          gold: "#C7A87B",    // dorado suave
          amethyst: "#7C6DEB" // toque amatista
        }
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.05)"
      },
      borderRadius: {
        'xl2': '1.25rem'
      }
    },
  },
  plugins: [],
}

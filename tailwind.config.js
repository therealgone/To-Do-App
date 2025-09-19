/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'bg-900': '#0A0A0A',
        'card': '#0F1113',
        'text-primary': '#EAEAEA',
        'text-secondary': '#9AA0A6',
        'accent': '#00E676',
        'accent-pressed': '#00C65A',
        'danger': '#FF5252',
        'neutral-border': '#1E1E1E',
        'placeholder': '#6E6E6E',
        darkN: "#0A0A0A",   
          whiteN: "#F5F5F5", 
          redN: "#FF2E2E",    
          grayN: "#1C1C1C",   
          yellowN: "#FFD400",   
          blueN: "#146EF5", 
           greenN: "#28C76F" ,
      },
      borderRadius: {
        'lg': '12px',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
          dotgothic: ["DotGothic16_400Regular"],
           orbitron: ["Orbitron_400Regular"],   
        orbitronBold: ["Orbitron_700Bold"],
      },

      
    },
  },
  plugins: [],
};

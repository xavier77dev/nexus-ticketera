/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins':['Poppins', 'sans-serif']
      },
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        red: '#dc2626',
        yellow: '#eab308',
        green: '#22c55e',
        gray: {
          '50': '#f9fafb',
          '100': '#f4f5f7',
          '900': '#1f2937',
        },
        negro: '#051014',
        blanco: '#f1f1f1',
        gris: '#5a6870',
        naranja: '#eda348',
        crema: '#051014',
        'marron-arcilla': '#988062',
        cyan: '#00d7ef',
        celeste: '#2ab2ed',
        'dark-celeste': '#0e79af',
        azul: '#0b3969',
        'dark-azul': '#001728',
      },
    },
  },
  plugins: [],
}

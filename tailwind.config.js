
// import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

import  plugin  from 'tailwindcss/plugins'
import scrollbar from 'tailwind-scrollbar'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
            primary: '#1E40AF',
            secondary: '#64748B',
        },
        fontFamily: {
            inter: ['Inter', 'sans-serif'],   // font-inter
        },
    },
} ,  
    plugins: [
        scrollbar({ nocompatible: true }),

        plugin(function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    /* Chrome, Safari */
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    /* Firefox */
                    'scrollbar-width': 'none',
                    /* IE and Edge */
                    '-ms-overflow-style': 'none',
                },
            })
        }),



    ],
}
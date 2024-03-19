/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['roboto', 'Fira Sans'],
            display: ['Lexend']
        },
    },
    daisyui: {
        themes: [],
    },
    plugins: [require("daisyui")],

}
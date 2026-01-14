/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fef5f1',
                    100: '#fce8df',
                    200: '#f9d0c3',
                    300: '#f5b09a',
                    400: '#ef8964',
                    500: '#D97757',
                    600: '#c25f40',
                    700: '#a24834',
                    800: '#853d2e',
                    900: '#6e362a',
                },
                secondary: {
                    50: '#f4f7f3',
                    100: '#e7efe4',
                    200: '#d0dfc9',
                    300: '#adc9a3',
                    400: '#9CAF88',
                    500: '#7a9469',
                    600: '#607553',
                    700: '#4d5e44',
                    800: '#404d39',
                    900: '#364231',
                },
                neutral: {
                    50: '#fdfcfb',
                    100: '#faf8f5',
                    200: '#f5f1eb',
                    300: '#ebe5da',
                    400: '#ddd4c5',
                    500: '#cec1ad',
                    600: '#b8a791',
                    700: '#9a8a75',
                    800: '#7e7161',
                    900: '#665d51',
                },
            },
        },
    },
    plugins: [],
}

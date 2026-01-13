/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            borderRadius: {
                xl: "1rem",
                "2xl": "1.25rem"
            },
            boxShadow: {
                soft: "0 12px 36px rgba(0,0,0,.10)"
            }
        }
    },
    plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E8E0FF", // Medium Lavender (darker)
        primaryMedium: "#D2C4FF", // Rich Lavender (darker)
        secondary: "#5A3EB8", // Deep Royal Purple
        accent: "#D4AF37", // Islamic Gold
        quotesDark: "#4A1E8C", // Mystic Deep Purple
        textDark: "#3A2C51", // Velvet Indigo
        textLight: "#F5F1FE", // Lavender Mist
        highlight: "#FFD166", // Golden Light
        accentLight: "#B18AFF", // Lilac Light
        accentDark: "#4D2A9C", // Deep Orchid Purple
        goldLight: "#F0DB9D", // Soft Gold Glow
      },
      boxShadow: {
        container: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        display: ['"Montserrat"', "sans-serif"],
        arabic: ['"Amiri"', "serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "wave-gradient": "linear-gradient(to right, #E8E0FF, #D2C4FF)",
        "islamic-pattern": `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2372A276' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".pattern-islamic": {
          "background-image":
            "var(--tw-gradient-stops), var(--tw-islamic-pattern)",
        },
      });
    },
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF9F5", // Very soft cream (warmer and lighter than Champagne)
        foreground: "#3D3D33", // Soft charcoal with a hint of olive (more legible than pure green)
        muted: "#939385",      // Softer gray-green
        border: "#E8E2DE",     // Very light taupe border
        accent: "#D4A373",     // Muted ochre (softer than Terracotta)
        pear: "#B7B7A4",       // Ash Gray for secondary areas
        lemon: "#F5EBE0",      // Linen white for sections
        primary: "#3D3D33",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-slow": "fadeIn 1.2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};


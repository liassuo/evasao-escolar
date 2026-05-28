/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(205 25% 91%)",
        input: "hsl(205 25% 89%)",
        ring: "hsl(192 82% 34%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(202 30% 16%)",
        primary: {
          DEFAULT: "#0e7490",
          dark: "#155e75",
          light: "#e0f2f7",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#155e75",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "hsl(200 40% 97%)",
          foreground: "hsl(200 12% 46%)",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "hsl(202 33% 14%)",
        },
        risk: {
          high: "#dc2626",
          "high-bg": "#fef2f2",
          medium: "#d97706",
          "medium-bg": "#fffbeb",
          low: "#15803d",
          "low-bg": "#f0fdf4",
        },
      },
      borderRadius: {
        xl: "1.25rem",
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

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
        // Neutros (escala fria, consistente)
        border: "hsl(214 28% 90%)",
        input: "hsl(214 28% 88%)",
        ring: "hsl(224 64% 33%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222 38% 18%)",
        // Hierarquia de texto
        ink: {
          DEFAULT: "hsl(222 47% 16%)", // títulos / texto forte
          soft: "hsl(220 18% 38%)", // texto secundário
        },
        // Azul institucional da marca (logo PersistAI)
        primary: {
          DEFAULT: "#1d4ed8",
          dark: "#16308f",
          light: "#e8eefc",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#2f6df6",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "hsl(214 40% 97%)",
          foreground: "hsl(220 14% 46%)",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "hsl(222 38% 18%)",
        },
        risk: {
          high: "#dc2626",
          "high-bg": "#fef2f2",
          medium: "#d97706",
          "medium-bg": "#fffbeb",
          low: "#16a34a",
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

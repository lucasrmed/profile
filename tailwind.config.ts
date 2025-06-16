import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#01c38e", // Verde turquesa
          foreground: "#ffffff", // Branco
        },
        secondary: {
          DEFAULT: "#132d46", // Azul marinho
          foreground: "#ffffff", // Branco
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#132d46", // Azul marinho
          foreground: "#ffffff", // Branco
        },
        accent: {
          DEFAULT: "#01c38e", // Verde turquesa
          foreground: "#1a1e29", // Azul escuro/quase preto
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Adicionando as cores da paleta diretamente
        palette: {
          darkBlue: "#1a1e29", // Azul muito escuro/quase preto
          navy: "#132d46", // Azul marinho
          turquoise: "#01c38e", // Verde turquesa
          white: "#ffffff", // Branco
        },
        gradient: {
          start: "#0a3a3a", // Verde escuro para o gradiente
          mid: "#132d46", // Azul marinho
          end: "#1a1e29", // Azul escuro/quase preto
        },
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(135deg, #0a3a3a 0%, #132d46 50%, #1a1e29 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        "52": "repeat(52, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

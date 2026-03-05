import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Beeckle Network Tech Theme
        tech: {
          'deep-space': '#02040F',
          'midnight': '#0F172A',
          'neon-cyan': '#00F3FF',
          'electric-blue': '#2563EB',
          'holographic-purple': '#7C3AED',
          'dark-overlay': 'rgba(2, 4, 15, 0.8)',
        },
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
        "neon-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(0, 243, 255, 0.3), 0 0 10px rgba(0, 243, 255, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 15px rgba(0, 243, 255, 0.6), 0 0 25px rgba(0, 243, 255, 0.4)",
          },
        },
        "holographic": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        "border-scan": {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "holographic": "holographic 3s ease infinite",
        "border-scan": "border-scan 2s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'tech-grid': 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke=\'rgb(0 243 255 / 0.1)\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg>")',
        'circuit-pattern': 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 400\'%3e%3cpath fill=\'rgb(0 243 255 / 0.05)\' d=\'M200 0h1v1h-1V0zM0 200h1v1H0v-1zm200 199h1v1h-1v-1zm199-199h1v1h-1V0z\'/%3e%3cpath stroke=\'rgb(0 243 255 / 0.1)\' d=\'M201 0v400M0 201h400\'/%3e%3c/svg>")',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: "#FBF8F1", deep: "#F2EDE0" },
        ink: { DEFAULT: "#14142B", soft: "#4B4B66" },
        electric: "#2B59FF",
        lav: "#C8B6FF",
        teal: "#22C3B0",
        coral: "#FF6A57",
        sun: "#FFA94D",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(43,89,255,0.18), 0 2px 8px rgba(20,20,43,0.05)",
        lift: "0 30px 70px -20px rgba(43,89,255,0.30), 0 8px 20px rgba(20,20,43,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;

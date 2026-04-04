export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        destructive: "var(--color-destructive)",
        card: "var(--color-card)",
        popover: "var(--color-popover)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
      },
    },
  },
  plugins: [],
};

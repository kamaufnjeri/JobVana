import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        text: 'var(--text-color)',
        borderColor: 'var(--border-color)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'], // Modern body text
        lora: ['Lora', 'serif'], // Stylish for paragraphs
        roboto: ['Roboto', 'sans-serif'], // Clean and readable
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }], // Bold
        h2: ['28px', { lineHeight: '36px', fontWeight: '600' }], // Semi-bold
        h3: ['24px', { lineHeight: '32px', fontWeight: '500' }], // Medium
        h4: ['20px', { lineHeight: '28px', fontWeight: '400' }], // Regular
        h5: ['18px', { lineHeight: '26px', fontWeight: '400' }], // Regular
        h6: ['16px', { lineHeight: '24px', fontWeight: '400' }], // Regular
        paragraph: ['16px', { lineHeight: '24px', fontWeight: '400' }], // Default text
        small: ['14px', { lineHeight: '20px', fontWeight: '400' }], // Small text
      },
    },
  },
  plugins: [],
} satisfies Config;

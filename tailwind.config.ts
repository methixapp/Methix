import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',    // Black
        secondary: '#4B5563',  // Dark gray
        background: '#F9FAFB', // Very light gray, almost white
        surface: '#FFFFFF',    // White
        text: {
          DEFAULT: '#1F2937',  // Dark gray for primary text
          light: '#4B5563',    // Medium gray for secondary text
        },
        accent: '#6B7280',     // Medium gray for accents
        button: {
          DEFAULT: '#000000',  // Black for buttons
          hover: '#374151',    // Dark gray for button hover state
        },
      },
    },
  },
  plugins: [],
};
export default config;

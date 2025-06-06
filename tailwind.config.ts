import type { Config } from "tailwindcss";

/**
 * Tailwind Configuration
 * 
 * Customizes the Tailwind CSS framework for the project:
 * - Content paths for scanning
 * - Custom theme extensions
 * - Font family utilities
 */
const config: Config = {
  // Define which files Tailwind should scan for classes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom font family utilities
      fontFamily: {
        "red-hat-display": ["var(--font-red-hat-display)"],
        "red-hat-text": ["var(--font-red-hat-text)"],
      },
    },
  },
  plugins: [],
};

export default config; 
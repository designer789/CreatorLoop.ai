import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import "./globals.css";

/**
 * Font Configuration
 * Red Hat Display: Used for headings and brand elements
 * - Weights: 300-900 for maximum flexibility
 * - Display: swap for better loading performance
 */
const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

/**
 * Font Configuration
 * Red Hat Text: Used for body text and UI elements
 * - Weights: 300-700 for optimal readability
 * - Display: swap for better loading performance
 */
const redHatText = Red_Hat_Text({
  variable: "--font-red-hat-text",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Site Metadata
 * Used for SEO and browser tab information
 */
export const metadata: Metadata = {
  title: "CreatorLoop.ai",
  description: "Weave Your Vision, Own Your Creation",
  icons: {
    icon: "/favicon.png",
  },
};

/**
 * Root Layout Component
 * 
 * Provides the base structure for all pages:
 * - Font variables for global use
 * - Antialiased text rendering
 * - Consistent layout structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatDisplay.variable} ${redHatText.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

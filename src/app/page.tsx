import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import ProductMechanism from "@/components/ProductMechanism";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

/**
 * Home Page Component
 * 
 * Main landing page structure:
 * - Header with navigation
 * - Hero section with main content
 * - Features section with interactive carousel and GSAP animations
 * - Use Cases section showcasing different user groups
 * - Product Mechanism section detailing technical workflow
 * - Tokenomics section with token economics and allocation
 * - Roadmap section showing development phases
 * - FAQ section with common questions and answers
 * - Footer with navigation, social links, and copyright
 * - Uses Red Hat Text as the default font
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-red-hat-text">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <UseCases />
        <ProductMechanism />
        <Tokenomics />
        <Roadmap />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

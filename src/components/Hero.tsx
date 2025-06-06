import Link from "next/link";

/**
 * Hero Component
 * 
 * Main landing section featuring:
 * - Beta badge
 * - Main headline with gradient text
 * - Description text
 * - Call-to-action buttons
 * - Visual grid of AI-generated art samples
 */
export default function Hero() {
  return (
    <section id="hero" className="w-full py-24 md:py-32 lg:py-40 px-8 md:px-12 lg:px-16 bg-[#faf6f1]">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start gap-10">
          {/* Beta Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <span className="text-lg font-medium font-red-hat-text">CreatorLoop.ai</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-[800] leading-[1.1] tracking-tight text-black font-red-hat-display">
            Weave Your Vision, Own Your Creation
          </h1>
          
          {/* Description Text */}
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl font-red-hat-text leading-relaxed">
            With CreatorLoop, your ideas become AI-powered visuals — whether it&apos;s a cinematic scene, a surreal artwork, or a 3D asset — fully owned by you, on-chain, and free from platform cuts.
          </p>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link 
              href="/create" 
              className="px-10 py-5 rounded-full bg-black text-white text-xl font-medium hover:opacity-90 transition-opacity text-center font-red-hat-text"
            >
              Start Creating
            </Link>
            <Link 
              href="/learn-more" 
              className="px-10 py-5 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors text-center text-xl font-red-hat-text"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Right Column: Visual Grid */}
        <div className="relative aspect-square w-full max-w-2xl mx-auto lg:max-w-none">
          {/* Background Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-3xl"></div>
          {/* Art Sample Grid */}
          <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-6 p-6">
            <div className="rounded-2xl bg-[#F28DEB] overflow-hidden transition-transform hover:scale-105">
              <div className="w-full h-full"></div>
            </div>
            <div className="rounded-2xl bg-[#917ED9] overflow-hidden transition-transform hover:scale-105">
              <div className="w-full h-full"></div>
            </div>
            <div className="rounded-2xl bg-[#72C1F2] overflow-hidden transition-transform hover:scale-105">
              <div className="w-full h-full"></div>
            </div>
            <div className="rounded-2xl bg-[#F2B705] overflow-hidden transition-transform hover:scale-105">
              <div className="w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
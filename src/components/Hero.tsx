import Link from "next/link";
import Image from "next/image";

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
          
          
        </div>

        {/* Right Column: Sample Grid */}
        <div className="relative w-full aspect-square grid grid-cols-2 gap-4">
          {/* Top Left: Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/p1.jpg"
              alt="AI Generated Art Sample 1"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Top Right: Video */}
          <div className="relative rounded-2xl overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/video1.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Bottom Left: Video */}
          <div className="relative rounded-2xl overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/video2.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Bottom Right: Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/p2.jpg"
              alt="AI Generated Art Sample 2"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Decorative Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
} 
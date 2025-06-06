"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Features Component
 * 
 * Showcases core platform features using an interactive carousel
 * - Responsive cards per view:
 *   - Desktop: 3 cards per view
 *   - Tablet: 2 cards per view
 *   - Mobile: 1 card per view
 * - Scrolls one card at a time
 * - Manual navigation controls
 * - Drag/swipe navigation support
 * - Enhanced visual design with GSAP scroll animations
 * - Responsive design
 */
export default function Features() {
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const targetWrapperRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const features = [
    {
      title: "All-in-One AI Content Creation Platform",
      description: "A no-code, powerful suite that enables users to generate high-quality video, image, and 3D content from simple prompts or uploads — designed for creators of all levels.",
      icon: "🎨",
      color: "#F28DEB"
    },
    {
      title: "Multi-Modal Prompt Engine",
      description: "Supports diverse input types, including text, images, sketches, and voice, allowing for flexible and expressive cross-modal content generation.",
      icon: "🔄",
      color: "#917ED9"
    },
    {
      title: "Transparent Ownership & Incentivization Layer",
      description: "A chain-based attribution system ensures verifiable authorship and provenance of content, while the $LOOP token economy rewards publishing, sharing, remixing, and community curation.",
      icon: "🔗",
      color: "#72C1F2"
    },
    {
      title: "Decentralized Content Feed",
      description: "A dynamic, user-curated feed of trending and high-quality content indexed on-chain, not platform-governed.",
      icon: "📱",
      color: "#F2B705"
    },
    {
      title: "Customizable AI Model Layer",
      description: "Allows users to fine-tune and deploy their own AI models within the platform, with usage metered via $LOOP.",
      icon: "⚡",
      color: "#F29F05"
    }
  ];

  // Responsive cards per view calculation
  const getCardsPerView = () => {
    if (windowWidth < 768) return 1; // Mobile: 1 card
    if (windowWidth < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  };

  const cardsPerView = getCardsPerView();
  const totalSlides = features.length - cardsPerView + 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset current slide when cards per view changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [cardsPerView]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  }, [isDragging, dragStart]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    
    if (dragOffset > threshold) {
      // Dragging right - go to previous slide
      if (currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    } else if (dragOffset < -threshold) {
      // Dragging left - go to next slide  
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      }
    }
    
    setDragOffset(0);
  }, [isDragging, dragOffset, currentSlide, totalSlides]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  // Add global mouse move and up listeners when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleDragMove(e.clientX);
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      handleDragEnd();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
    document.addEventListener('mouseup', handleGlobalMouseUp, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  useEffect(() => {
    if (!trackerRef.current || !targetWrapperRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trackerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      }
    });

    tl.fromTo(
      targetWrapperRef.current,
      {
        width: "90vw",
        height: "90vh", 
        borderRadius: "30px",
        duration: 1
      },
      {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 1
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Calculate transform with drag offset
  const getTransform = () => {
    const baseTransform = -currentSlide * (100 / cardsPerView);
    const dragTransform = isDragging ? (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100 : 0;
    return baseTransform + dragTransform;
  };

  return (
    <div id="features" ref={trackerRef} className="w-full h-[200vh] relative">
      <div 
        ref={stickyWrapperRef}
        className="sticky top-0 w-full h-screen z-10 flex items-center justify-center"
        style={{ position: 'sticky' }}
      >
        <div
          ref={targetWrapperRef}
          className="bg-[#917ED9] overflow-hidden flex items-center justify-center"
          style={{
            width: '90vw',
            height: '90vh',
            borderRadius: '30px'
          }}
        >
          <section className="w-full h-full py-24 md:py-32 relative overflow-hidden">
            <div className="relative max-w-[90rem] mx-auto px-8 md:px-12 lg:px-16 h-full flex flex-col justify-center">
              {/* Section Header with Navigation */}
              <div className="text-center mb-12 md:mb-20">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-sm rounded-full mb-4 md:mb-6">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white animate-pulse"></div>
                  <span className="text-base md:text-lg font-medium font-red-hat-text text-white/90">Platform Features</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[800] text-white font-red-hat-display mb-4 md:mb-6 leading-tight">
                  CORE FEATURES
                </h2>
                <div className="w-24 md:w-32 h-1 md:h-1.5 bg-white mx-auto mb-8 md:mb-10 rounded-full"></div>
                
                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-4 md:gap-8">
                  <button
                    onClick={prevSlide}
                    className="group w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 text-white backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:bg-white/30 transition-all duration-300"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="group w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 text-white backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:bg-white/30 transition-all duration-300"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Carousel Container */}
              <div className="relative w-full mx-auto flex-1 flex items-center">
                {/* Carousel Slides */}
                <div 
                  ref={carouselRef}
                  className="relative w-full cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ userSelect: 'none' }}
                >
                  <div 
                    className={`flex transition-transform ${isDragging ? 'duration-0' : 'duration-700'} ease-out`}
                    style={{ transform: `translateX(${getTransform()}%)` }}
                  >
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 px-4"
                        style={{ 
                          width: `${100 / cardsPerView}%`,
                          minWidth: `${100 / cardsPerView}%`
                        }}
                      >
                        <div className="group relative h-full">
                          {/* Card Background with Solid Color */}
                          <div 
                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                            style={{ backgroundColor: feature.color }}
                          ></div>
                          
                          {/* Main Card */}
                          <div className="relative flex flex-col items-center justify-start text-center p-6 md:p-8 lg:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-white/30 transition-all duration-500 h-full group-hover:scale-105 group-hover:-translate-y-2">
                            {/* Icon Container */}
                            <div 
                              className="relative p-4 md:p-6 rounded-2xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300"
                              style={{ backgroundColor: feature.color }}
                            >
                              <span className="text-3xl md:text-4xl">{feature.icon}</span>
                              <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-lg md:text-xl lg:text-2xl font-[700] text-black font-red-hat-display mb-4 md:mb-6 leading-tight group-hover:text-black/90 transition-colors">
                              {feature.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-sm md:text-base lg:text-lg text-black/70 font-red-hat-text leading-relaxed group-hover:text-black/80 transition-colors">
                              {feature.description}
                            </p>
                            
                            {/* Decorative Element */}
                            <div 
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 md:w-20 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{ backgroundColor: feature.color }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 
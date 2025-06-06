"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * UseCases Component
 * 
 * Showcases different user groups and their specific benefits using an interactive carousel
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
export default function UseCases() {
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const targetWrapperRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const useCases = [
    {
      title: "Independent Creators",
      image: "/images/independent-creators.jpg",
      color: "#F28DEB",
      benefits: [
        "Instant content generation without setup overhead",
        "One-click publishing to Web2 and Web3 platforms",
        "Supports fast, fragmented workflows",
        "On-chain authorship and timestamping"
      ]
    },
    {
      title: "Marketing & Branding Teams",
      image: "/images/marketing-teams.jpg",
      color: "#917ED9",
      benefits: [
        "Generate branded visuals from sketches or prompts",
        "Output multiple variations for A/B testing",
        "Optimize content performance with AI",
        "Private workflows for secure campaign development"
      ]
    },
    {
      title: "Studios & Creative Teams",
      image: "/images/creative-teams.jpg",
      color: "#72C1F2",
      benefits: [
        "Structured collaboration across the content lifecycle",
        "Decentralized team access via wallet identity",
        "Unified asset management and version clarity",
        "Supports editorial, visual, and hybrid teams"
      ]
    },
    {
      title: "Open-source AI Communities",
      image: "/images/ai-communities.jpg",
      color: "#F2B705",
      benefits: [
        "Upload and train custom AI models",
        "Earn $LOOP through public model usage",
        "Transparent usage tracking and attribution",
        "Community-friendly model co-iteration"
      ]
    },
    {
      title: "Platforms & Protocols",
      image: "/images/platforms.jpg",
      color: "#F29F05",
      benefits: [
        "Integrate AI generation with CreatorLoop APIs",
        "Keep content and control within your interface",
        "Strengthen trust via on-chain attribution",
        "Structured outputs for easy indexing and syndication"
      ]
    }
  ];

  // Responsive cards per view calculation
  const getCardsPerView = () => {
    if (windowWidth < 768) return 1; // Mobile: 1 card
    if (windowWidth < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  };

  const cardsPerView = getCardsPerView();
  const totalSlides = useCases.length - cardsPerView + 1;
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

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
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
  };

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
  }, [isDragging, dragStart, dragOffset, currentSlide, totalSlides]);

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

    // Animate container size
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

    // Animate background color transition from purple to blue
    tl.fromTo(
      trackerRef.current,
      {
        backgroundColor: "#917ED9", // Purple (from Features)
        duration: 1
      },
      {
        backgroundColor: "#72C1F2", // Blue (UseCases)
        duration: 1
      },
      0 // Start at the same time as container animation
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
    <div id="use-cases" ref={trackerRef} className="w-full h-[200vh] relative" style={{ backgroundColor: "#917ED9" }}>
      <div 
        ref={stickyWrapperRef}
        className="sticky top-0 w-full h-screen z-10 flex items-center justify-center"
        style={{ position: 'sticky' }}
      >
        <div
          ref={targetWrapperRef}
          className="bg-[#72C1F2] overflow-hidden flex items-center justify-center"
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
                  <span className="text-base md:text-lg font-medium font-red-hat-text text-white/90">Perfect For</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[800] text-white font-red-hat-display mb-4 md:mb-6 leading-tight">
                  USE CASES
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
                  className="relative w-full cursor-grab active:cursor-grabbing select-none "
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
                    {useCases.map((useCase, index) => (
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
                            style={{ backgroundColor: useCase.color }}
                          ></div>
                          
                          {/* Main Card */}
                          <div className="relative flex flex-col items-center justify-start text-center rounded-3xl bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 h-full group-hover:scale-105 group-hover:-translate-y-2 overflow-hidden">
                            {/* Image Container with 5:3 Aspect Ratio */}
                            <div className="relative w-full aspect-[5/3] group-hover:scale-105 transition-transform duration-300">
                              <Image
                                src={useCase.image}
                                alt={useCase.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                priority={index === 0}
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
                            </div>
                            
                            {/* Content Container */}
                            <div className="p-6 md:p-8 lg:p-10 w-full">
                              {/* Title */}
                              <h3 className="text-lg md:text-xl lg:text-xl font-[700] text-black font-red-hat-display mb-4 md:mb-6 leading-tight group-hover:text-black/90 transition-colors">
                                {useCase.title}
                              </h3>
                              
                              {/* Benefits List */}
                              <ul className="space-y-2 md:space-y-3 text-left w-full">
                                {useCase.benefits.map((benefit, benefitIndex) => (
                                  <li 
                                    key={benefitIndex}
                                    className="flex items-start gap-1 md:gap-2 text-black/70 font-red-hat-text leading-relaxed group-hover:text-black/80 transition-colors"
                                  >
                                    <div 
                                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-1.5 md:mt-2 flex-shrink-0"
                                      style={{ backgroundColor: useCase.color }}
                                    ></div>
                                    <span className="text-sm md:text-base">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              {/* Decorative Element */}
                              <div 
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 md:w-20 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ backgroundColor: useCase.color }}
                              ></div>
                            </div>
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
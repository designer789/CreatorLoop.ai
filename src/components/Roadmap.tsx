"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * RoadmapPhase Component - Individual phase card
 */
interface RoadmapPhaseProps {
  phase: {
    number: number;
    title: string;
    features: string[];
    color: string;
    isCompleted?: boolean;
  };
  isLast?: boolean;
}

function RoadmapPhase({ phase, isLast = false }: RoadmapPhaseProps) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-4 sm:left-6 top-0 w-0.5 h-full bg-gray-200 z-0"></div>
      )}
      
      <div className="relative flex gap-4 sm:gap-6 md:gap-8 pb-12 sm:pb-16">
        {/* Phase Number Circle */}
        <div className="relative flex-shrink-0 z-10">
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-[800] text-base sm:text-lg shadow-lg border-2 sm:border-4 border-white"
            style={{ backgroundColor: phase.color }}
          >
            {phase.number}
          </div>
          {phase.isCompleted && (
            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] sm:text-xs">✓</span>
            </div>
          )}
        </div>
        
        {/* Phase Content */}
        <div className="flex-1">
          <div className="group relative h-full">
            <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/90 h-full">
              {/* Phase Title */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-[800] text-slate-900 font-red-hat-display mb-2">
                  {phase.title}
                </h3>
                <div 
                  className="w-12 sm:w-16 h-0.5 sm:h-1 rounded-full"
                  style={{ backgroundColor: phase.color }}
                ></div>
              </div>
              
              {/* Features List */}
              <ul className="space-y-3 sm:space-y-4">
                {phase.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4">
                    <div 
                      className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full mt-2 sm:mt-2.5 flex-shrink-0"
                      style={{ backgroundColor: phase.color }}
                    ></div>
                    <p className="text-sm sm:text-base md:text-lg text-slate-700 font-regular font-red-hat-text leading-relaxed">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Roadmap Component
 * 
 * Displays the development roadmap with timeline visualization
 * showing the 4 phases of platform development
 */
export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial background color explicitly
    gsap.set(sectionRef.current, {
      backgroundColor: "#F9DD69"
    });

    // Timeline: yellow to light blue when scrolling to bottom
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom bottom",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      }
    });

    // Animate background color from yellow to light blue
    tl.to(sectionRef.current, {
      backgroundColor: "#E8F4FD", // Soft light blue (same as FAQ)
      duration: 1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const phases = [
    {
      number: 1,
      title: "Foundation Launch",
      color: "#F28DEB",
      isCompleted: false,
      features: [
        "Launch of CreatorLoop Studio Beta (image & video AI generation)",
        "Wallet-based login and on-chain content ownership",
        "Deployment of private vault system for user-generated assets",
        "Early creator onboarding and incentive test programs"
      ]
    },
    {
      number: 2,
      title: "Ethereum & Ecosystem Rollout",
      color: "#917ED9",
      isCompleted: false,
      features: [
        "Launch on Ethereum mainnet with on-chain content + identity anchoring",
        "$LOOP token launch and liquidity provisioning on DEX",
        "Activation of content mining, upvote rewards, and curation logic",
        "Launch of base-level DAO governance & proposal system"
      ]
    },
    {
      number: 3,
      title: "Ecosystem Expansion",
      color: "#72C1F2",
      isCompleted: false,
      features: [
        "Expansion to multi-chain deployment (Base / Arbitrum / Polygon, etc.)",
        "Launch of user-trainable custom AI model hosting",
        "API access for third-party content platforms and tools",
        "Release of on-chain creator analytics & interaction reputation scoring"
      ]
    },
    {
      number: 4,
      title: "Full Decentralization & Global Scale",
      color: "#F2B705",
      isCompleted: false,
      features: [
        "Launch of AI model marketplace with monetized on-chain distribution",
        "Release of mobile tools for lightweight creation on the go",
        "Full DAO control over platform logic, incentives, and treasury",
        "Global creator node program to support multilingual decentralized collaboration"
      ]
    }
  ];

  return (
    <section id="roadmap" ref={sectionRef} className="w-full py-24 sm:py-32 md:py-40 lg:py-48 relative overflow-hidden" style={{ backgroundColor: "#F9DD69" }}>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white/80 backdrop-blur-lg rounded-full mb-4 sm:mb-6 md:mb-8 border border-white/20">
            <div className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 animate-pulse"></div>
            <span className="text-sm sm:text-base md:text-lg font-semibold font-red-hat-text text-slate-700">Development Timeline</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[900] text-slate-900 font-red-hat-display leading-[1.1] sm:leading-[1.1] md:leading-tight">
            ROADMAP
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {phases.map((phase, index) => (
            <RoadmapPhase
              key={index}
              phase={phase}
              isLast={index === phases.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
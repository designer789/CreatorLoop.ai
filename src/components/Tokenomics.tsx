"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * UtilityCard Component - Reusable card for utility display
 */
interface UtilityCardProps {
  title: string;
  icon: string;
  color: string;
}

function UtilityCard({ title, icon, color }: UtilityCardProps) {
  return (
    <div className="group relative h-full">
      <div className="relative p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/30 transition-all duration-500 h-full flex flex-col">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shrink-0"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <h3 className="text-lg font-[700] text-slate-900 font-red-hat-display leading-tight">
            {title}
          </h3>
        </div>
        
        
        
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

/**
 * AllocationItem Component - Individual allocation item
 */
interface AllocationItemProps {
  label: string;
  percentage: number;
  color: string;
}

function AllocationItem({ label, percentage, color }: AllocationItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <span className="font-semibold text-slate-800 font-red-hat-text">
          {label}
        </span>
      </div>
      <span className="text-lg font-[700] text-slate-900 font-red-hat-display">
        {percentage}%
      </span>
    </div>
  );
}

/**
 * Tokenomics Component
 * 
 * Displays comprehensive tokenomics information including token details,
 * utility breakdown, and allocation distribution
 */
export default function Tokenomics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial background color explicitly
    gsap.set(sectionRef.current, {
      backgroundColor: "#F8BBD9"
    });

    // Timeline: pink to yellow when scrolling to bottom
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom bottom",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      }
    });

    // Animate background color from pink to yellow
    tl.to(sectionRef.current, {
      backgroundColor: "#F9DD69", // Your original bright yellow
      duration: 1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const utilities = [
    {
      title: "Compute Metering for Generative Workflows",
      icon: "⚡",
      color: "#F28DEB"
    },
    {
      title: "Creator Reward Distribution",
      icon: "🎨",
      color: "#917ED9"
    },
    {
      title: "Curation-as-Staking",
      icon: "🔒",
      color: "#72C1F2"
    },
    {
      title: "Custom Model Monetization",
      icon: "🧠",
      color: "#F2B705"
    },
    {
      title: "Governance via DAO Participation",
      icon: "🏛️",
      color: "#50C878"
    },
    {
      title: "Vault Access & Permission Control",
      icon: "🔐",
      color: "#FF6B6B"
    }
  ];

  const allocations = [
    { label: "Liquidity", percentage: 60, color: "#F28DEB" },
    { label: "Staking", percentage: 10, color: "#917ED9" },
    { label: "Ecosystem Growth", percentage: 5, color: "#72C1F2" },
    { label: "Community Rewards", percentage: 10, color: "#F2B705" },
    { label: "Team & Advisors", percentage: 5, color: "#50C878" },
    { label: "DAO Treasury", percentage: 5, color: "#FF6B6B" },
    { label: "Partnership & Market", percentage: 5, color: "#9B59B6" }
  ];

  return (
    <section id="tokenomics" ref={sectionRef} className="w-full py-48 relative overflow-hidden" style={{ backgroundColor: "#F8BBD9" }}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-lg rounded-full mb-8 border border-white/20">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
            <span className="text-lg font-semibold font-red-hat-text text-slate-700">Token Economics</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-[900] text-slate-900 font-red-hat-display mb-8 leading-tight">
            TOKENOMICS
          </h2>
        </div>

        {/* Token Overview */}
        <div className="mb-20">
          <div className="relative p-8 md:p-12 rounded-3xl bg-white/90 ">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-[900] text-slate-900 font-red-hat-display mb-4">
                CreatorLoop Token
              </h3>
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <span className="text-2xl font-[800] text-white font-red-hat-display">$LOOP</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-md mx-auto">
              <div className="text-center p-6 rounded-2xl bg-slate-50/80 border border-slate-200/50">
                <div className="text-3xl md:text-4xl font-[900] text-slate-900 font-red-hat-display mb-2">
                  1,000,000,000
                </div>
                <div className="text-lg font-semibold text-slate-600 font-red-hat-text">
                  Total Supply
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Utility Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-[900] text-slate-900 font-red-hat-display mb-4">
              Utility
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((utility, index) => (
              <UtilityCard
                key={index}
                title={utility.title}
                icon={utility.icon}
                color={utility.color}
              />
            ))}
          </div>
        </div>

        {/* Allocation Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-[900] text-slate-900 font-red-hat-display mb-4">
              Allocation
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Allocation Chart Placeholder */}
            <div className="relative">
                             <div className="relative p-8 rounded-3xl bg-white/90">
                <div className="aspect-square w-full max-w-md mx-auto flex items-center justify-center">
                  <div className="text-center">
                                         <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center mb-4">
                      <div className="text-white text-center">
                        <div className="text-3xl font-[900] font-red-hat-display">$LOOP</div>
                        <div className="text-lg font-semibold font-red-hat-text">Distribution</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Allocation Breakdown */}
            <div className="space-y-4">
              {allocations.map((allocation, index) => (
                <AllocationItem
                  key={index}
                  label={allocation.label}
                  percentage={allocation.percentage}
                  color={allocation.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
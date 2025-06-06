"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * WorkflowCard Component - Reusable card for workflow display
 */
interface WorkflowCardProps {
  workflow: {
    title: string;
    color: string;
    steps: string[];
  };
}

function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <div className="group relative h-full">
      <div className="relative p-8 md:p-10 rounded-3xl bg-white backdrop-blur-xl border border-white/30 transition-all duration-700 h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-[700] text-slate-900 font-red-hat-display leading-tight">
            {workflow.title}
          </h3>
        </div>
        
        <div className="relative flex-1">
          {workflow.steps.map((step, stepIndex) => (
            <div key={stepIndex} className="relative">
              <div className="flex items-center gap-4 py-2">
                <div className="relative flex-shrink-0">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: workflow.color }}
                  >
                    {stepIndex + 1}
                  </div>
                  
                  {stepIndex < workflow.steps.length - 1 && (
                    <div 
                      className="absolute top-8 left-1/2 w-0.5 h-16 -translate-x-1/2"
                      style={{ backgroundColor: workflow.color, opacity: 0.3 }}
                    ></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/50 group-hover:bg-white/60 transition-all duration-300">
                    <p className="text-base font-medium text-slate-800 font-red-hat-text">
                      {step}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: workflow.color }}
        ></div>
      </div>
    </div>
  );
}

/**
 * ProductMechanism Component
 * 
 * Showcases the technical workflow and mechanisms of the platform
 * with modern workflow visualization and clean design
 */
export default function ProductMechanism() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial background color explicitly
    gsap.set(sectionRef.current, {
      backgroundColor: "#72C1F2"
    });

    // First timeline: blue to white when entering
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "top 50%",
        scrub: 1,
        markers: false,
      }
    });

    // Animate background color from blue to white
    tl1.to(sectionRef.current, {
      backgroundColor: "#FAF6F1", // White
      duration: 1
    });

    // Second timeline: white to pink when scrolling to bottom
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom bottom",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      }
    });

    // Animate background color from white to pink
    tl2.to(sectionRef.current, {
      backgroundColor: "#F8BBD9", // Light pink (same as TOKENOMICS)
      duration: 1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const workflows = [
    {
      title: "Decentralized Creation Flow",
      icon: "🔄",
      color: "#F28DEB",
      gradient: "from-pink-400 to-pink-600",
      steps: [
        "Wallet-Based Auth",
        "Prompt-to-Asset Pipeline", 
        "Encrypted Storage & Retrieval"
      ]
    },
    {
      title: "Data Sovereignty Model",
      icon: "🛡️",
      color: "#917ED9",
      gradient: "from-purple-400 to-purple-600",
      steps: [
        "On-Chain Attribution",
        "Full User Control"
      ]
    },
    {
      title: "Model Execution & Token Incentive Loop",
      icon: "⚡",
      color: "#72C1F2",
      gradient: "from-blue-400 to-blue-600",
      steps: [
        "Compute Metering via $LOOP",
        "Creator Mining",
        "Curation-as-Governance"
      ]
    },
    {
      title: "Modular AI Deployment",
      icon: "🧩",
      color: "#F2B705",
      gradient: "from-yellow-400 to-yellow-600",
      steps: [
        "Create or import AI models",
        "Earn $LOOP when public models are used"
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="w-full py-48 relative overflow-hidden" style={{ backgroundColor: "#72C1F2" }}>
     
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-lg rounded-full mb-8 border border-white/20">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 animate-pulse"></div>
            <span className="text-lg font-semibold font-red-hat-text text-slate-700">Technical Framework</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-[900] text-slate-900 font-red-hat-display mb-8 leading-tight">
            PRODUCT MECHANISM
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              & WORKFLOW
            </span>
          </h2>
        
        </div>

        {/* Workflows Flow Layout */}
        <div className="relative">
          {/* Mobile: Stack vertically */}
          <div className="lg:hidden space-y-8">
            {workflows.map((workflow, index) => (
              <div key={index} className="group relative">
                <WorkflowCard workflow={workflow} />
              </div>
            ))}
          </div>

          {/* Desktop: Custom flow layout following the pattern 1→2→4→3→1 */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Grid Layout for Equal Height Cards */}
              <div className="grid grid-cols-5 grid-rows-5 gap-0">
                {/* Card 1 */}
                <div className="col-span-2 row-span-2">
                  <WorkflowCard workflow={workflows[0]} />
                </div>

                {/* Arrow 1→2 */}
                <div className="row-span-2 col-start-3 flex justify-center items-center">
                  <svg width="140" height="24" viewBox="0 0 140 24" className="text-slate-500">
                    <defs>
                      <marker id="arrow1to2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                    <line x1="10" y1="12" x2="130" y2="12" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow1to2)" />
                  </svg>
                </div>

                {/* Card 2 */}
                <div className="col-span-2 row-span-2 col-start-4">
                  <WorkflowCard workflow={workflows[1]} />
                </div>

                {/* Arrow 3→1 (left side) */}
                <div className="col-span-2 row-start-3 flex justify-center items-center">
                  <svg width="24" height="140" viewBox="0 0 24 140" className="text-slate-500">
                    <defs>
                      <marker id="arrow3to1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                    <line x1="12" y1="130" x2="12" y2="10" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow3to1)" />
                  </svg>
                </div>

                {/* Arrow 2→4 (right side) */}
                <div className="col-span-2 col-start-4 row-start-3 flex justify-center items-center">
                  <svg width="24" height="140" viewBox="0 0 24 140" className="text-slate-500">
                    <defs>
                      <marker id="arrow2to4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                    <line x1="12" y1="10" x2="12" y2="130" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow2to4)" />
                  </svg>
                </div>

                {/* Card 3 */}
                <div className="col-span-2 row-span-2 row-start-4">
                  <WorkflowCard workflow={workflows[2]} />
                </div>

                {/* Arrow 4→3 */}
                <div className="row-span-2 col-start-3 row-start-4 flex flex-col justify-center items-center gap-4">
                  <svg width="140" height="24" viewBox="0 0 140 24" className="text-slate-500">
                    <defs>
                      <marker id="arrow4to3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                    <line x1="130" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow4to3)" />
                  </svg>
                  <svg width="140" height="24" viewBox="0 0 140 24" className="text-slate-500">
                    <defs>
                      <marker id="arrow1to2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                    <line x1="10" y1="12" x2="130" y2="12" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow1to2)" />
                  </svg>
                </div>

                {/* Card 4 */}
                <div className="col-span-2 row-span-2 col-start-4 row-start-4">
                  <WorkflowCard workflow={workflows[3]} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
} 
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * FAQItem Component - Individual FAQ accordion item
 */
interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ faq, isOpen, onToggle, index }: FAQItemProps) {
  const colors = ["#F28DEB", "#917ED9", "#72C1F2", "#F2B705"];
  const color = colors[index % colors.length];

  return (
    <div className="group relative">
      <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl border border-white/30 transition-all duration-300 hover:bg-white/95">
        {/* Question Button */}
        <button
          onClick={onToggle}
          className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-4 focus:outline-none"
        >
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-[700] text-slate-900 font-red-hat-display leading-tight">
              {faq.question}
            </h3>
          </div>
          
          {/* Expand/Collapse Icon */}
          <div className="flex-shrink-0">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              style={{ backgroundColor: "#00000010" }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
                className="text-black"
              >
                <path 
                  d="M4 6L8 10L12 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Answer Content */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <p className="text-base md:text-lg text-slate-700 font-red-hat-text leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FAQ Component
 * 
 * Displays frequently asked questions in an accordion format
 * with smooth animations and color-coded numbering
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is CreatorLoop?",
      answer: "CreatorLoop is a decentralized AI content platform that enables users to generate, own, and monetize media assets, such as images, videos, and 3D visuals, using wallet-based identity, on-chain attribution, and tokenized rewards."
    },
    {
      question: "How does content ownership work?",
      answer: "Every piece of content generated on CreatorLoop is cryptographically tied to the creator's wallet. This on-chain attribution ensures verifiable authorship, timestamped origin, and exclusive editing rights."
    },
    {
      question: "Do I need coding skills or design tools to use CreatorLoop?",
      answer: "No. CreatorLoop is fully no-code. Users generate content using text prompts, sketches, reference images, or voice inputs through a streamlined interface."
    },
    {
      question: "What makes CreatorLoop different from other AI tools?",
      answer: "CreatorLoop combines advanced AI generation with Web3 principles—user-owned data, on-chain traceability, decentralized governance, and token-based monetization. It's not just a tool; it's an economic layer for creators."
    },
    {
      question: "How do I earn $LOOP tokens on the platform?",
      answer: "Users earn $LOOP for content that gains traction—likes, remixes, shares—or through curation, model deployment, and participation in DAO governance. All earning logic is triggered on-chain."
    },
    {
      question: "Is content automatically published on-chain?",
      answer: "No. Users choose whether to publish content on-chain. On-chain publication is required for attribution, monetization, and participation in reward logic, but off-chain drafts remain private."
    },
    {
      question: "Can I upload my own AI model?",
      answer: "Yes. CreatorLoop supports user-trainable models. You can upload, deploy, and monetize your own AI models. If made public, others pay $LOOP to use them, and you earn from each invocation."
    },
    {
      question: "What wallets does CreatorLoop support?",
      answer: "CreatorLoop supports MetaMask, WalletConnect-compatible wallets, and any Ethereum-compatible wallet. No email or password login is required—just a wallet signature."
    },
    {
      question: "What chains does CreatorLoop support?",
      answer: "CreatorLoop is live on Ethereum and is expanding to Base, Arbitrum, and Polygon to support cheaper transactions and broader accessibility."
    },
    {
      question: "How is CreatorLoop governed?",
      answer: "Governance is handled by the CreatorLoop DAO. $LOOP holders can propose, vote, and shape decisions on features, rewards, protocol rules, and treasury usage."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-48 relative overflow-hidden" style={{ backgroundColor: "#E8F4FD" }}>
      
      
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-lg rounded-full mb-8 border border-white/20">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
            <span className="text-lg font-semibold font-red-hat-text text-slate-700">Common Questions</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-[900] text-slate-900 font-red-hat-display mb-8 leading-tight">
            FAQ
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
} 
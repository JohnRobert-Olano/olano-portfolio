"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "@/data/portfolio";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-text", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative z-10 pointer-events-none px-4"
    >
      <div className="text-center flex flex-col items-center pointer-events-auto max-w-3xl">
        <h1 className="hero-text text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white drop-shadow-sm">
          {portfolioData.personalInfo.name}
        </h1>
        
        <h2 className="hero-text text-2xl md:text-3xl font-medium tracking-tight mb-6 text-white/80">
          {portfolioData.personalInfo.title}
        </h2>
        
        <p className="hero-text text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
          {portfolioData.personalInfo.bio}
        </p>
      </div>
    </section>
  );
}

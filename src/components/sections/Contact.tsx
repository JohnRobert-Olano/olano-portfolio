"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".contact-card", {
      scrollTrigger: {
        trigger: ".contact-card",
        start: "top 85%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.2)",
    });
  }, { scope: containerRef });

  return (
    <section 
      id="contact"
      ref={containerRef} 
      className="min-h-[70vh] flex flex-col items-center justify-between pt-32 pb-8 relative z-10 px-4"
    >
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="contact-card spatial-glass p-10 md:p-16 text-center max-w-2xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 text-white drop-shadow-sm">
            Let&apos;s Build Something.
          </h2>
          
          <p className="text-white/70 text-lg mb-10 max-w-md mx-auto font-light leading-relaxed">
            Whether you have a specific project in mind or just want to chat about agentic engineering and 3D web experiences, my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a 
              href={`mailto:${portfolioData.personalInfo.email}`}
              className="w-full sm:w-auto px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium tracking-wide transition-all duration-300 hover:scale-[1.03] hover:bg-white/20 shadow-lg"
            >
              Email Me
            </a>
            
            <a 
              href={portfolioData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white/90 font-medium tracking-wide transition-all duration-300 hover:scale-[1.03] hover:bg-white/5 hover:border-white/20 shadow-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-white/30 text-sm font-light tracking-wide">
        © 2026 John Robert L. Olaño. Built with Next.js, Three.js, and Agentic Workflows.
      </footer>
    </section>
  );
}

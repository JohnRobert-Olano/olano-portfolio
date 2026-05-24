"use client";

import { Playfair_Display } from "next/font/google";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

const playfair = Playfair_Display({ subsets: ["latin"] });

const VISION_TEXTS = ["Design", "Engineering", "Agentic AI", "Spatial Computing", "The Future"];

export default function Vision() {
  return (
    <div id="vision-section" className="relative py-20 overflow-hidden bg-[#050505]">
      {/* Background Ambient Glowing Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow-1 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow-2 z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="spatial-glass p-8 md:p-16 text-center border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-white/20 transition-all duration-500">
          
          {/* Section Category Tag */}
          <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.25em] text-blue-400 uppercase mb-6">
            01 / PHILOSOPHY
          </span>

          {/* Vision Heading */}
          <h2 className={`${playfair.className} text-3xl md:text-5xl font-bold text-white leading-tight mb-8`}>
            Pioneering the Intersection of
          </h2>

          {/* Morphing Gooey Text Showcase */}
          <div className="h-[120px] md:h-[160px] flex items-center justify-center relative">
            <GooeyText
              texts={VISION_TEXTS}
              morphTime={2.5}
              cooldownTime={2.5}
              className="w-full h-full pointer-events-auto"
              contentClassName="justify-center items-center"
              textClassName={`${playfair.className} text-white text-5xl md:text-7xl font-extrabold italic items-center justify-center`}
            />
          </div>

          <p className="text-white/60 text-sm md:text-base font-light tracking-wide max-w-lg mx-auto leading-relaxed mt-6">
            Fusing mathematical precision with human-centric interfaces to build high-performance products that feel natural, premium, and alive.
          </p>

        </div>
      </div>
    </div>
  );
}

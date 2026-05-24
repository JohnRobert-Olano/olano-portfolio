"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    const initScrollTrigger = () => {
      // In case duration is NaN or something, we fallback to 1 but it shouldn't happen
      // if metadata is loaded.
      const duration = video.duration || 1;
      const fps = 30;
      const totalFrames = duration * fps;
      
      const playhead = { frame: 0 };

      gsap.to(playhead, {
        frame: totalFrames,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // Adjust this value to make the scroll longer/shorter
          scrub: 0.5, // Smooth scrubbing (number defines smoothing time in seconds)
          pin: true,
        },
        onUpdate: () => {
          // Snap the video time to exactly 30fps frames to prevent floating point inaccuracies
          video.currentTime = Math.round(playhead.frame) / fps;
        }
      });
    };

    // If metadata is already loaded, initialize immediately
    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      // Otherwise wait for it
      video.addEventListener("loadedmetadata", initScrollTrigger);
      return () => {
        video.removeEventListener("loadedmetadata", initScrollTrigger);
      };
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center border-y border-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
      <video
        ref={videoRef}
        src="/Laptop_levitating_and_separating_202605182107.mp4"
        playsInline
        muted
        preload="auto"
        className="w-full h-full object-cover max-w-7xl mx-auto rounded-[2rem] shadow-2xl"
      />
      {/* Text overlay that stays centered over the video */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(37,99,235,0.8)] mix-blend-plus-lighter opacity-90 transition-opacity duration-300">
          Future of Computing
        </h2>
      </div>
    </section>
  );
}

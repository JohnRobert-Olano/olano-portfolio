"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SequenceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [isNear, setIsNear] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  
  const frameCount = 240;

  // 1. Initial mount: Preload first frame and observe section entry
  useEffect(() => {
    const firstImg = new Image();
    firstImg.src = "/sequence/0001.webp";
    
    firstImg.onload = () => {
      // Draw first frame immediately
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = firstImg.naturalWidth;
          canvas.height = firstImg.naturalHeight;
          ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    // Store first image
    const images: HTMLImageElement[] = [firstImg];
    imagesRef.current = images;

    // Observe when the container is near (1000px before viewport)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1000px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Start preloading remaining 239 frames when section is near
  useEffect(() => {
    if (!isNear) return;

    const images = [...imagesRef.current];
    let loadedCount = 1; // 1st frame is already counted
    setLoadProgress(Math.round((loadedCount / frameCount) * 100));

    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = `/sequence/${(i + 1).toString().padStart(4, "0")}.webp`;
      
      const handleLoad = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / frameCount) * 100);
        setLoadProgress(progress);
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad; // Count error as loaded to prevent stuck progress

      images[i] = img;
    }
    
    imagesRef.current = images;
  }, [isNear]);

  // 3. Handle loader fade out transition
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  useGSAP(() => {
    // Only set up scroll trigger once we have the container
    if (!containerRef.current || !canvasRef.current) return;
    
    const playhead = { frame: 0 };
    
    gsap.to(playhead, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 0.5,
        pin: true,
      },
      onUpdate: () => {
        const frameIndex = Math.round(playhead.frame);
        const img = imagesRef.current[frameIndex];
        const canvas = canvasRef.current;
        
        // Ensure image is fully loaded before drawing it
        if (img && img.complete && img.naturalWidth > 0 && canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center border-y border-white/5"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover max-w-7xl mx-auto rounded-[2rem] shadow-2xl"
      />
      
      {/* Sleek Glassmorphic Loading Overlay */}
      {showLoader && (
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-700 pointer-events-none ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="spatial-glass px-8 py-6 rounded-3xl max-w-xs text-center border border-white/10 shadow-2xl flex flex-col items-center pointer-events-auto">
            <h3 className="text-white text-base font-semibold mb-3 tracking-tight">Loading Spatial Experience</h3>
            <div className="w-48 bg-white/15 h-1.5 rounded-full overflow-hidden mb-2 border border-white/5">
              <div 
                className="bg-white h-full rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-white/60 text-xs font-mono">{loadProgress}%</span>
          </div>
        </div>
      )}
      
      {/* Framer Motion Spatial Overlays */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center gap-24">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="spatial-glass px-8 py-6 rounded-2xl max-w-lg text-center shadow-[0_10px_35px_rgba(0,0,0,0.4)] border border-white/10"
        >
          <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Spatial Computing
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
            OptiTrace Ecosystem: Processing complex visual layers in real-time, bridging physical and digital interaction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="spatial-glass px-8 py-6 rounded-2xl max-w-lg text-center shadow-[0_10px_35px_rgba(0,0,0,0.4)] border border-white/10"
        >
          <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Seamless Immersion
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
            Scroll-bound navigation synchronizing hardware insights with fluid declarative UI animations.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}

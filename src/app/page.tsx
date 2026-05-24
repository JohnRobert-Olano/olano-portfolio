"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import WebBackground from "@/components/canvas/WebBackground";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div id="full-app-shell" className="relative min-h-screen flex flex-col font-sans select-none antialiased bg-brand-dark overflow-x-hidden">
      {/* Live Connecting Web Canvas Background */}
      <WebBackground />

      {/* Primary Component Stream */}
      <main id="app-main-view" className="flex-1 w-full relative">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Unified Global Footer */}
      <footer id="app-footer" className="bg-zinc-950 border-t border-zinc-900 py-12 px-6 lg:px-24 w-full z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">J.R. OLAÑO &bull; CND_WKSP &bull; {currentYear}</span>
            <span className="text-zinc-800">|</span>
            <span className="text-zinc-505">B.S. CS Candidate Workspace Portfolio</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center md:text-right text-[9px] text-zinc-650 tracking-normal font-light">
              3D Technical Helmet mask credit by Mr. P (CC BY 4.0)
            </div>
            <a 
              id="footer-email-link"
              href="mailto:jrobertolano@gmail.com" 
              className="text-brand-orange hover:underline text-[10px] font-bold"
            >
              jrobertolano@gmail.com
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Square Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          id="btn-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Return to top coordinates"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-zinc-900 hover:bg-brand-orange text-zinc-405 hover:text-black rounded-none flex items-center justify-center border border-zinc-800 hover:border-transparent transition-all duration-300 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Terminal, Github, Linkedin, MessageSquare, ArrowUp, Sparkles, Code, Briefcase, Mail } from "lucide-react";
import WebBackground from "./components/WebBackground";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import AICompanion from "./components/AICompanion";

export default function App() {
  const [aiOpen, setAiOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor viewport scroll heights for navbar transparency effects and scroll-to-top appearances
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div id="full-app-shell" className="relative min-h-screen text-slate-100 flex flex-col font-sans select-none antialiased bg-brand-dark">
      
      {/* Live Connecting Web Canvas Background */}
      <WebBackground />

      {/* Modern High-Fidelity Header Navigation Bar */}
      <header
        id="app-global-header"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 px-6 lg:px-24 py-5 ${
          scrolled 
            ? "bg-brand-dark/95 backdrop-blur-md border-b border-zinc-900 py-3.5 shadow-xl" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Badge (Matching Bold Typography styling) */}
          <div 
            id="brand-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-brand-orange flex items-center justify-center text-black font-black text-sm tracking-tighter group-hover:scale-105 transition-transform rounded-none">
              JR
            </div>
            <span className="font-display font-black text-xs tracking-[0.2em] text-white group-hover:text-brand-orange transition-colors uppercase">
              J.R. Olaño
            </span>
          </div>

          {/* Nav Links */}
          <nav id="navbar-links" className="hidden md:flex items-center gap-8 text-[10px] uppercase font-mono tracking-widest font-bold">
            <button
              id="nav-link-projects"
              onClick={() => handleScrollToSection("projects")}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5 text-brand-orange" />
              01 &bull; Projects
            </button>
            <button
              id="nav-link-experience"
              onClick={() => handleScrollToSection("experience")}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-brand-orange" />
              02 &bull; Experience
            </button>
            <button
              id="nav-link-contact"
              onClick={() => handleScrollToSection("contact")}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-brand-orange" />
              03 &bull; Contact
            </button>
          </nav>

          {/* Action Trigger Node */}
          <div id="nav-actions" className="flex items-center gap-3">
            <button
              id="nav-btn-ai-console"
              onClick={() => setAiOpen(true)}
              className="relative flex items-center gap-2 bg-brand-orange/10 hover:bg-brand-orange border border-brand-orange/30 hover:border-transparent text-brand-orange hover:text-black font-mono font-bold text-[9px] tracking-wider px-4 py-2.5 rounded-none transition-all duration-300 uppercase"
            >
              <Terminal className="w-3.5 h-3.5 inline-block" />
              AI Agent Console
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Primary Redesigned Component Stream */}
      <main id="app-main-view" className="flex-1">
        <Hero 
          onSeeWork={() => handleScrollToSection("projects")} 
          onOpenAI={() => setAiOpen(true)} 
        />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Unified Global Footer */}
      <footer id="app-footer" className="bg-zinc-950 border-t border-zinc-900 py-12 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
          
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">J.R. OLAÑO &bull; CND_WKSP &bull; {currentYear}</span>
            <span className="text-zinc-800">|</span>
            <span className="text-zinc-500">B.S. CS Candidate Workspace Portfolio</span>
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

      {/* Floating Square Button for AI Companion (matching Brutalist Swiss design rules) */}
      <button
        id="btn-floating-ai-agent"
        onClick={() => setAiOpen(!aiOpen)}
        title="Invoke J.R.'s Smart AI Representative"
        className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-brand-orange hover:bg-orange-500 text-black rounded-none flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <MessageSquare className="w-4.5 h-4.5 text-black stroke-[2.5px]" />
      </button>

      {/* Floating Square Scroll-To-Top Button (matching Brutalist Swiss design rules) */}
      {showScrollTop && (
        <button
          id="btn-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Return to top coordinates"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-zinc-900 hover:bg-brand-orange text-zinc-400 hover:text-black rounded-none flex items-center justify-center border border-zinc-850 hover:border-transparent transition-all duration-305"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Embedded Real Server-side Conversation Console Drawer */}
      <AICompanion isOpen={aiOpen} onClose={() => setAiOpen(false)} />

    </div>
  );
}

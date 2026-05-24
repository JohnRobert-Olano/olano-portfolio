import React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

interface HeroProps {
  onSeeWork: () => void;
  onOpenAI: () => void;
}

export default function Hero({ onSeeWork, onOpenAI }: HeroProps) {
  // Mouse position spring parallax for the tech-helmet graphic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    // Set rotation bounds
    mouseX.set(x * 15); 
    mouseY.set(-y * 15); 
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-24 pt-28 pb-16 overflow-hidden bg-brand-dark tech-grid-bg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic ambient backlights using theme orange */}
      <div id="glow-orange" className="absolute top-[15%] left-[-5%] w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[130px] pointer-events-none" />
      <div id="glow-dark" className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[135px] pointer-events-none" />

      <div id="hero-layout-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Left Side: Modernist High-Contrast Typography Column */}
        <div id="hero-editorial-left" className="lg:col-span-7 flex flex-col justify-center text-left space-y-8 relative">
          
          <div className="absolute -left-12 -top-10 opacity-[0.03] text-[220px] font-display font-black pointer-events-none select-none text-white leading-none">
            01
          </div>

          <motion.div
            id="intro-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex self-start items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold font-mono"
          >
            <Sparkles className="w-3 h-3 animate-pulse text-brand-orange" />
            Selected Works &bull; 2026 Edition
          </motion.div>

          {/* Epic Bold Typography Title Pairing */}
          <div id="hero-title-group" className="space-y-2">
            <motion.p
              id="hero-greeting"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-zinc-500 font-mono text-[11px] tracking-[0.35em] uppercase font-bold"
            >
              HI, I'M J.R. OLAÑO &mdash; ASSOCIATE SE
            </motion.p>
            
            <motion.h1
              id="hero-main-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display text-[55px] md:text-[90px] font-black uppercase tracking-[-0.05em] leading-[0.85] text-white"
            >
              Designing <br />
              <span className="text-transparent text-outline font-black block md:inline">
                The Future.
              </span>
            </motion.h1>
          </div>

          {/* Georgia-Style Editorial Serif Block matching instructions */}
          <motion.div
            id="hero-serif-desc"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl"
          >
            <p className="font-serif text-zinc-400 text-lg md:text-xl leading-snug font-light italic">
              "We transform complex computer vision frameworks and modern software paradigms into elegant, high-impact interactive systems using robust local intelligence."
            </p>
          </motion.div>

          {/* Call to Actions - Sharp edges */}
          <motion.div
            id="hero-ctas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              id="btn-see-work"
              onClick={onSeeWork}
              className="group flex items-center gap-3 bg-brand-orange hover:bg-orange-500 text-black font-black text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-sm transition-all duration-300 shadow-md hover:shadow-brand-orange/10"
            >
              See my work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-black stroke-[3px]" />
            </button>

            <button
              id="btn-hire-agent"
              onClick={onOpenAI}
              className="flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-[0.15em] px-6 py-4 rounded-sm transition-all duration-300"
            >
              <Terminal className="w-4 h-4 text-brand-orange animate-pulse" />
              AI Agent Companion
            </button>
          </motion.div>

        </div>

        {/* Right Side: Gigantic Backdrop + Interactive High-Tech Orange Lens Helmet */}
        <div id="hero-graphic-right" className="lg:col-span-5 relative flex items-center justify-center min-h-[440px]">
          
          {/* Huge layout vertical coordinates marker */}
          <div className="absolute left-0 bottom-4 text-zinc-800 font-mono text-[10px] tracking-widest uppercase hidden lg:block select-none">
            [ LATENCY GRID: OK ]
          </div>

          {/* Interactive Mask */}
          <motion.div
            id="interactive-mask-container"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-[320px] md:max-w-[360px] aspect-[4/5] flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Ambient backlight glow */}
            <div id="helmet-backlight" className="absolute inset-4 bg-brand-orange/5 rounded-full blur-3xl -z-10" />

            {/* High fidelity Tech Visor Mask SVG in Orange and Matte-Zinc colors */}
            <svg
              id="spider-visor-svg"
              className="w-full h-full drop-shadow-[0_20px_40px_rgba(242,125,38,0.1)]"
              viewBox="0 0 400 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Back neck dark plating */}
              <path d="M120 440 C170 480 230 480 280 440 L260 480 L140 480 Z" fill="#0C0C0F" />
              <path d="M140 440 L200 480 L260 440" stroke="#F27D26" strokeWidth="2" strokeDasharray="3 3" opacity="0.25" />

              {/* Head Shell Outer Shape (Cybernetic Matte-Grey shell) */}
              <path
                d="M200 60 C90 60 70 190 70 290 C70 380 140 440 200 440 C260 440 330 380 330 290 C330 190 310 60 200 60 Z"
                fill="url(#headGrad)"
                stroke="#27272A"
                strokeWidth="4"
              />

              {/* Tech lines for structure */}
              <g opacity="0.3">
                <path d="M200 60 C180 150 180 350 200 440" stroke="#FFFFFF" strokeWidth="1.2" />
                <path d="M200 60 C120 150 110 350 200 440" stroke="#FFFFFF" strokeWidth="1" />
                <path d="M200 60 C280 150 290 350 200 440" stroke="#FFFFFF" strokeWidth="1" />
                <path d="M90 150 Q200 120 310 150" stroke="#FFFFFF" strokeWidth="1" fill="none" />
                <path d="M75 220 Q200 185 325 220" stroke="#FFFFFF" strokeWidth="1" fill="none" />
                <path d="M70 290 Q200 250 330 290" stroke="#FFFFFF" strokeWidth="1" fill="none" />
                <path d="M85 360 Q200 320 315 360" stroke="#FFFFFF" strokeWidth="1" fill="none" />
              </g>

              {/* Left Eye Tech Frame (Bright orange inner core) */}
              <path
                d="M95 280 C95 220 160 215 178 275 C185 300 178 335 178 335 C178 335 125 330 95 280 Z"
                fill="#0A0B10"
                stroke="#F27D26"
                strokeWidth="2.5"
              />
              <path
                d="M103 275 C103 230 158 225 170 275 C175 295 170 325 170 325 C170 325 125 320 103 275 Z"
                fill="url(#goldEyeGrad)"
              />
              <path d="M120 240 Q150 240 162 265" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

              {/* Right Eye Tech Frame */}
              <path
                d="M305 280 C305 220 240 215 222 275 C215 300 222 335 222 335 C222 335 275 330 305 280 Z"
                fill="#0A0B10"
                stroke="#F27D26"
                strokeWidth="2.5"
              />
              <path
                d="M297 275 C297 230 242 225 230 275 C225 295 230 325 230 325 C230 325 275 320 297 275 Z"
                fill="url(#goldEyeGrad)"
              />
              <path d="M280 240 Q250 240 238 265" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

              {/* Geometric Grid Logo on mask lower plate */}
              <g transform="translate(185, 400) scale(0.6)" opacity="0.4">
                <rect x="0" y="0" width="10" height="10" stroke="#FF8C00" strokeWidth="1.5" fill="none" />
                <rect x="15" y="0" width="10" height="10" stroke="#FF8C00" strokeWidth="1.5" fill="none" />
                <rect x="0" y="15" width="10" height="10" stroke="#FF8C00" strokeWidth="1.5" fill="none" />
                <circle cx="20" cy="20" r="3" fill="#FFFFFF" />
              </g>

              {/* Gradients */}
              <defs>
                <radialGradient id="headGrad" cx="50%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#2E2E35" />
                  <stop offset="60%" stopColor="#1C1C22" />
                  <stop offset="100%" stopColor="#08080A" />
                </radialGradient>

                <linearGradient id="goldEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA500" />
                  <stop offset="60%" stopColor="#F27D26" />
                  <stop offset="100%" stopColor="#8B0000" />
                </linearGradient>
              </defs>
            </svg>

            {/* Custom Technical Label */}
            <div id="graphics-author-credit" className="absolute bottom-2.5 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-zinc-800 text-[9px] text-zinc-400 font-mono tracking-wider pointer-events-none select-none uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping mr-1.5" />
              Adaptive Edge Visor (V3)
            </div>
          </motion.div>
        </div>

      </div>

      {/* Corporate Sharp Bio Block - fully matching Swiss design rules */}
      <motion.div
        id="hero-glass-bio-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative max-w-7xl mx-auto w-full mt-20 z-20"
      >
        <div className="relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800 p-8 md:p-10 rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row gap-8 items-stretch">
          
          <div className="md:w-1/4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-900 pb-6 md:pb-0 md:pr-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-brand-orange flex items-center justify-center font-display font-black text-black text-xl">
                JR
              </div>
              <div>
                <h4 className="font-display font-black text-lg text-white uppercase tracking-tight">John Robert L. Olaño</h4>
                <p className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{`[ jrobertolano@gmail.com ]`}</p>
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-1">{`+63 998 382 3017`}</p>
                <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mt-0.5">{`Imus City, Cavite`}</p>
              </div>
            </div>

            <div className="pt-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest hidden md:block">
              Candidacy: B.S. CS 2026
            </div>
          </div>

          <div className="md:w-3/4 flex flex-col justify-between space-y-6">
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Highly adaptable <strong className="text-white font-bold">Associate Software Engineer</strong> and <strong className="text-white font-bold">AI-Assisted Builder</strong> in the final semester of a B.S. in Computer Science program. Eager to learn and driven by a strong curiosity for exploring new technologies to solve complex problems. Combines proven expertise in traditional backend development, system architecture, and full-stack application development (React, Node.js, SQL) with cutting-edge agentic engineering workflows. Adept at utilizing AI coding agents to optimize codebases and build dynamic computer vision systems like <span className="text-brand-orange font-mono font-bold">MobileNetV3</span> and <span className="text-brand-orange font-mono font-bold">EfficientNet-B0</span>.
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
              {["Cavite State University", "GWA: 1.28", "Edge Computer Vision", "Agentic Engineering", "TypeScript / Python / Dart"].map((item, i) => (
                <span key={i} className="text-[9px] font-mono uppercase bg-zinc-900 border border-zinc-800 px-3 py-1 text-zinc-400 font-bold">
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
      
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export default function About() {
  const headerReveal = useScrollReveal(0.3);
  const leftReveal = useScrollReveal(0.15);
  const rightReveal = useScrollReveal(0.15);

  const headerVariants = {
    below: { opacity: 0, y: 30, rotateX: 6, transformPerspective: 1000 },
    inside: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 },
    above: { opacity: 0, y: -30, rotateX: -6, transformPerspective: 1000 },
  };

  const columnVariants = {
    below: { opacity: 0, y: 45, rotateX: 8, transformPerspective: 1000, scale: 0.98 },
    inside: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000, scale: 1 },
    above: { opacity: 0, y: -45, rotateX: -8, transformPerspective: 1000, scale: 0.98 },
  };

  // Tab control state
  const [activeTab, setActiveTab] = useState<"persona" | "academic" | "metrics">("persona");

  // Terminal console state
  const [inputValue, setInputValue] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const [activePreset, setActivePreset] = useState<"about" | "gwa" | "thesis" | "skills" | "volunteer">("about");
  
  const terminalScreenRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalScreenRef.current) {
      // Use scrollTop to scroll ONLY the terminal display container internally
      // without scrolling the entire browser window/page viewport.
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  }, [terminalHistory, activePreset]);

  // Execute terminal command
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...terminalHistory, { type: "input" as const, text: trimmed }];
    const cleanCmd = trimmed.toLowerCase();

    if (cleanCmd === "help") {
      newHistory.push({
        type: "system",
        text: "AVAILABLE PRESETS: about | gwa | thesis | skills | volunteer"
      });
      newHistory.push({
        type: "system",
        text: "UTILITY COMMANDS: help | clear"
      });
    } else if (cleanCmd === "clear") {
      setTerminalHistory([]);
      setInputValue("");
      return;
    } else if (cleanCmd === "about" || cleanCmd === "about.json") {
      setActivePreset("about");
      newHistory.push({ type: "output", text: "Loading ABOUT.JSON parameters..." });
    } else if (cleanCmd === "gwa" || cleanCmd === "dx gwa") {
      setActivePreset("gwa");
      newHistory.push({ type: "output", text: "Loading DX GWA scholastic standing data..." });
    } else if (cleanCmd === "thesis" || cleanCmd === "thesis status") {
      setActivePreset("thesis");
      newHistory.push({ type: "output", text: "Loading SENIOR THESIS classification metrics..." });
    } else if (cleanCmd === "skills" || cleanCmd === "sys --skills" || cleanCmd === "sys skills") {
      setActivePreset("skills");
      newHistory.push({ type: "output", text: "Loading SYS SKILLS primary engineering stack..." });
    } else if (cleanCmd === "volunteer" || cleanCmd === "volunteer log") {
      setActivePreset("volunteer");
      newHistory.push({ type: "output", text: "Loading VOLUNTEER LOG live production records..." });
    } else {
      newHistory.push({
        type: "error",
        text: `Command not recognized: "${trimmed}". Type "help" for a list of active commands.`
      });
    }

    setTerminalHistory(newHistory);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputValue);
    }
  };

  const loadPreset = (preset: "about" | "gwa" | "thesis" | "skills" | "volunteer") => {
    setActivePreset(preset);
    setTerminalHistory(prev => [
      ...prev,
      { type: "input", text: `load preset: ${preset.toUpperCase()}` },
      { type: "output", text: `Displaying verified data payload for ${preset.toUpperCase()} preset.` }
    ]);
  };

  return (
    <section id="about" className="relative py-24 px-6 lg:px-24 bg-[#050505] border-t border-zinc-900 tech-grid-bg scroll-mt-24">
      {/* Background ambient light */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[110px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <motion.div 
          ref={headerReveal.ref}
          variants={headerVariants}
          animate={headerReveal.position}
          transition={{ duration: 0.6, ease: "easeOut" }}
          id="about-header" 
          className="text-left mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-brand-orange font-mono text-xs tracking-[0.2em] uppercase font-bold">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            01 / INTERACTIVE PERSONNEL PROFILE
          </div>
          
          <h2 className="font-display text-[45px] md:text-[64px] font-black uppercase tracking-tight leading-none text-white">
            PROFILE <span className="text-transparent text-outline">OVERVIEW.</span>
          </h2>
          <div className="w-24 h-1 bg-brand-orange mt-2" />
        </motion.div>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Profile info card & command port) */}
          <motion.div 
            ref={leftReveal.ref}
            variants={columnVariants}
            animate={leftReveal.position}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-4 space-y-8 flex flex-col justify-start"
          >
            
            {/* Profile Info Card with custom corner borders */}
            <div className="relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-900 p-6 rounded-none shadow-2xl space-y-6">
              {/* Highlighted Orange Corners */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-brand-orange" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-brand-orange" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-brand-orange" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-brand-orange" />
              
              {/* Name & Avatar Block */}
              <div className="flex items-center gap-4 border-b border-zinc-900 pb-5">
                <div className="w-12 h-12 bg-brand-orange flex items-center justify-center font-display font-black text-black text-xl shadow-[0_0_15px_rgba(242,125,38,0.25)]">
                  JR
                </div>
                <div>
                  <h3 className="font-display font-black text-md text-white uppercase tracking-tight leading-none">
                    John Robert L. Olaño
                  </h3>
                  <p className="font-mono text-[9px] text-brand-orange font-bold uppercase tracking-wider mt-1.5">
                    Candidate B.S. CS 2026
                  </p>
                </div>
              </div>

              {/* Coordinates List */}
              <div className="space-y-3 font-mono text-[10px]">
                
                <div className="flex items-center justify-between border border-zinc-900 bg-zinc-950/50 px-4 py-3.5 rounded-none">
                  <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-wider text-[8px]">
                    <Mail className="w-3.5 h-3.5 text-zinc-600" />
                    Mail Coordinate
                  </div>
                  <a href="mailto:jrobertolano@gmail.com" className="text-white hover:text-brand-orange font-bold transition-colors">
                    jrobertolano@gmail.com
                  </a>
                </div>

                <div className="flex items-center justify-between border border-zinc-900 bg-zinc-950/50 px-4 py-3.5 rounded-none">
                  <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-wider text-[8px]">
                    <Phone className="w-3.5 h-3.5 text-zinc-600" />
                    Interface Line
                  </div>
                  <span className="text-zinc-300 font-bold">
                    +63 998 382 3017
                  </span>
                </div>

                <div className="flex items-center justify-between border border-zinc-900 bg-zinc-950/50 px-4 py-3.5 rounded-none">
                  <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-wider text-[8px]">
                    <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                    Physical Base
                  </div>
                  <span className="text-zinc-300 font-bold text-right">
                    Imus City, Cavite (Metro Manila Open)
                  </span>
                </div>

              </div>

            </div>

            {/* Interactive Command Terminal */}
            <div className="bg-zinc-950/70 border border-zinc-900 rounded-none shadow-2xl flex flex-col overflow-hidden text-left">
              
              {/* Terminal Title Bar */}
              <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-900 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-brand-orange" />
                  &gt;_ INTERACTIVE DIAGNOSTIC OPERATOR PORT
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYS ONLINE
                </span>
              </div>

              {/* Terminal Screen / Display */}
              <div 
                ref={terminalScreenRef}
                className="p-4 h-[210px] overflow-y-auto bg-black font-mono text-[10px] text-zinc-400 space-y-3 leading-relaxed"
              >
                
                {/* Initializing logs */}
                <div className="text-zinc-600 border-b border-zinc-900 pb-2">
                  <p>SYSTEM BOOT SEQUENCE: OK</p>
                  <p>CONNECTED TO LOCALHOST.PORTFOLIO_DB</p>
                </div>

                {/* Command History */}
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="space-y-1">
                    {line.type === "input" ? (
                      <p className="text-zinc-500">
                        <span className="text-brand-orange font-bold">$</span> {line.text}
                      </p>
                    ) : line.type === "error" ? (
                      <p className="text-red-500 font-bold">{line.text}</p>
                    ) : line.type === "system" ? (
                      <p className="text-zinc-500 italic">{line.text}</p>
                    ) : (
                      <p className="text-emerald-500">{line.text}</p>
                    )}
                  </div>
                ))}

                {/* Current Active Preset Data Display */}
                {activePreset === "about" && (
                  <div className="text-zinc-300 space-y-1 pt-1">
                    <p><span className="text-zinc-600">&quot;alias&quot;:</span> <span className="text-brand-orange">&quot;J.R. Olaño&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;role&quot;:</span> <span className="text-brand-orange">&quot;Associate Software Engineer & AI-Assisted Builder&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;academicStatus&quot;:</span> <span className="text-brand-orange">&quot;Senior Undergrad, B.S. CS (Cavite State University)&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;location&quot;:</span> <span className="text-brand-orange">&quot;Imus City, Cavite (Open to Metro Manila)&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;philosophy&quot;:</span> <span className="text-brand-orange">&quot;Bridging solid software foundations with cognitive agent loops.&quot;</span></p>
                  </div>
                )}

                {activePreset === "gwa" && (
                  <div className="text-zinc-300 space-y-1 pt-1">
                    <p><span className="text-zinc-600">&quot;cumulativeGWA&quot;:</span> <span className="text-brand-orange">&quot;1.28&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;evaluationPeriod&quot;:</span> <span className="text-brand-orange">&quot;3rd Year, 2nd Semester&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;scholasticStanding&quot;:</span> <span className="text-brand-orange">&quot;Excellent Academic Record&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;institution&quot;:</span> <span className="text-brand-orange">&quot;Cavite State University&quot;</span></p>
                  </div>
                )}

                {activePreset === "thesis" && (
                  <div className="text-zinc-300 space-y-1 pt-1">
                    <p><span className="text-zinc-600">&quot;thesisTitle&quot;:</span> <span className="text-brand-orange">&quot;MobileNet Eye Disease Classification&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;focus&quot;:</span> <span className="text-brand-orange">&quot;Transfer Learning in Classifying Common External Eye Diseases&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;accuracyReached&quot;:</span> <span className="text-brand-orange">&quot;97.8%&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;coreArchitectures&quot;:</span> <span className="text-brand-orange">[&quot;EfficientNet-B0&quot;, &quot;MobileNetV3&quot;]</span></p>
                  </div>
                )}

                {activePreset === "skills" && (
                  <div className="text-zinc-300 space-y-1 pt-1">
                    <p><span className="text-zinc-600">&quot;languages&quot;:</span> <span className="text-brand-orange">[&quot;TypeScript&quot;, &quot;JavaScript&quot;, &quot;Python&quot;, &quot;Dart&quot;, &quot;C++&quot;, &quot;SQL&quot;]</span>,</p>
                    <p><span className="text-zinc-600">&quot;frameworks&quot;:</span> <span className="text-brand-orange">[&quot;React&quot;, &quot;Next.js&quot;, &quot;Flutter&quot;, &quot;Node.js&quot;, &quot;Express.js&quot;]</span>,</p>
                    <p><span className="text-zinc-600">&quot;databases&quot;:</span> <span className="text-brand-orange">[&quot;PostgreSQL&quot;, &quot;Firebase&quot;, &quot;SQLite&quot;]</span>,</p>
                    <p><span className="text-zinc-600">&quot;agenticEngineering&quot;:</span> <span className="text-brand-orange">[&quot;Cursor&quot;, &quot;Claude Code&quot;, &quot;Google Antigravity&quot;]</span></p>
                  </div>
                )}

                {activePreset === "volunteer" && (
                  <div className="text-zinc-300 space-y-1 pt-1">
                    <p><span className="text-zinc-600">&quot;organization&quot;:</span> <span className="text-brand-orange">&quot;Christ’s Commission Fellowship Alabang&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;role&quot;:</span> <span className="text-brand-orange">&quot;Live Production Volunteer&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;servicePeriod&quot;:</span> <span className="text-brand-orange">&quot;June 2019 – May 2026&quot;</span>,</p>
                    <p><span className="text-zinc-600">&quot;responsibilities&quot;:</span> <span className="text-brand-orange">[&quot;Live Audio support&quot;, &quot;Visual Presentations&quot;, &quot;Hardware Debugging&quot;]</span></p>
                  </div>
                )}

              </div>

              {/* Terminal Preset Buttons */}
              <div className="bg-zinc-950 px-4 py-2 border-t border-zinc-900 flex flex-wrap gap-1.5 items-center justify-between text-[8px] font-mono">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-zinc-600 font-bold uppercase tracking-wider">Presets:</span>
                  {(["about", "gwa", "thesis", "skills", "volunteer"] as const).map(preset => (
                    <button
                      key={preset}
                      onClick={() => loadPreset(preset)}
                      className={`px-2 py-1 border transition-all text-[8px] font-bold uppercase cursor-pointer ${
                        activePreset === preset
                          ? "bg-brand-orange text-black border-transparent"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                      }`}
                    >
                      {preset === "about" ? "about.json" : preset === "gwa" ? "dx gwa" : preset === "thesis" ? "thesis status" : preset === "skills" ? "sys skills" : "volunteer log"}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setTerminalHistory([]);
                    setInputValue("");
                  }}
                  className="px-2 py-1 border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer font-bold uppercase"
                >
                  Clear
                </button>
              </div>

              {/* Terminal Command Input */}
              <div className="bg-zinc-950 p-2.5 border-t border-zinc-900 flex items-center gap-2">
                <span className="text-brand-orange font-mono font-bold text-[10px] ml-1">$</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a command (e.g. help, clear, sys --skills)"
                  className="flex-1 bg-transparent font-mono text-[10px] text-white focus:outline-none placeholder-zinc-700"
                />
                <button
                  onClick={() => handleCommand(inputValue)}
                  className="bg-brand-orange hover:bg-red-600 text-black px-3.5 py-1.5 font-mono font-black text-[9px] uppercase tracking-wider transition cursor-pointer"
                >
                  Enter
                </button>
              </div>

            </div>

          </motion.div>

          {/* Right Column (Tabs navigation & matrix descriptions) */}
          <motion.div 
            ref={rightReveal.ref}
            variants={columnVariants}
            animate={rightReveal.position}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-8 space-y-6 flex flex-col justify-start"
          >
            
            {/* Tab Selectors */}
            <div className="flex border-b border-zinc-900 font-mono text-[9px] md:text-[10px] uppercase font-bold tracking-wider w-full overflow-x-auto select-none scrollbar-none">
              <button
                onClick={() => setActiveTab("persona")}
                className={`px-5 py-4 border-t-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === "persona"
                    ? "border-t-brand-orange bg-zinc-950/70 text-white font-black"
                    : "border-t-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                01. Operational Persona GWA
              </button>
              <button
                onClick={() => setActiveTab("academic")}
                className={`px-5 py-4 border-t-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === "academic"
                    ? "border-t-brand-orange bg-zinc-950/70 text-white font-black"
                    : "border-t-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                02. Academic High-Standing
              </button>
              <button
                onClick={() => setActiveTab("metrics")}
                className={`px-5 py-4 border-t-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === "metrics"
                    ? "border-t-brand-orange bg-zinc-950/70 text-white font-black"
                    : "border-t-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                03. Technology Metrics
              </button>
            </div>

            {/* Tab Content Box */}
            <div className="relative bg-zinc-950/50 border border-zinc-900 p-8 md:p-10 shadow-2xl space-y-8 min-h-[380px] flex flex-col justify-between text-left">
              
              <div className="space-y-6">
                
                {/* Active tab status bar */}
                <div className="flex items-center gap-3">
                  <span className="bg-brand-orange text-black font-mono font-black text-[9px] uppercase tracking-wider px-2 py-0.5 shadow-sm">
                    {activeTab === "persona" ? "STATUS: ACTIVE" : activeTab === "academic" ? "STATUS: EXCELLENT" : "STATUS: STABLE"}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                    Personnel Matrix Data
                  </span>
                </div>

                {/* Main Heading & Description */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-snug">
                      {activeTab === "persona" && (
                        <>Software Engineer & <span className="text-brand-orange">AI Coexistence Master</span></>
                      )}
                      {activeTab === "academic" && (
                        <>Academic Honors & <span className="text-brand-orange">Machine Learning Research</span></>
                      )}
                      {activeTab === "metrics" && (
                        <>Computational Engine & <span className="text-brand-orange">Alignment Stack</span></>
                      )}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans font-light">
                      {activeTab === "persona" && (
                        "John Robert L. Olaño (J.R.) is a premier candidate in B.S. Computer Science specializing in the alignment of traditional backend integrity and modular machine learning models. Built upon a robust comprehension of data architectures, PostgreSQL clustering, and Express.js REST guidelines, J.R. thrives in creating accelerated, automated systems."
                      )}
                      {activeTab === "academic" && (
                        "Recognized for top-tier scholastic standings with a cumulative GWA of 1.28 at Cavite State University. Deeply focused on applied neural computing research, particularly transfer learning methods. Author of senior thesis deploying optimized architectures directly on resource-constrained edge endpoints."
                      )}
                      {activeTab === "metrics" && (
                        "Fluent in full-stack backend development, reactive mobile architectures, and database transaction engines. Expertly utilizes AI developer nodes to streamline software delivery cycles and minimize compile latency."
                      )}
                    </p>
                  </motion.div>
                </AnimatePresence>

              </div>

              {/* Sub-cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left"
                >
                  {activeTab === "persona" && (
                    <>
                      <div className="bg-zinc-950 p-5 border border-zinc-900 space-y-2.5 rounded-none">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Core Methodology</h4>
                          <span className="flex items-center gap-1.5 text-[8px] font-mono text-brand-orange font-bold uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-ping" />
                            Agent Prompt
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                          Harnessing state-of-the-art agentic pipelines to deliver robust, high-availability software interfaces with fast delivery intervals.
                        </p>
                      </div>

                      <div className="bg-zinc-950 p-5 border border-zinc-900 space-y-2.5 rounded-none">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Modern Classification</h4>
                          <span className="flex items-center gap-1.5 text-[8px] font-mono text-emerald-400 font-bold uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Model Engine
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                          Accelerating specialized models like MobileNetV3 and EfficientNet-B0 to build deep diagnostic web environments.
                        </p>
                      </div>
                    </>
                  )}

                  {activeTab === "academic" && (
                    <>
                      <div className="bg-zinc-950 p-5 border border-zinc-900 space-y-2.5 rounded-none">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Thesis Architecture</h4>
                          <span className="flex items-center gap-1.5 text-[8px] font-mono text-brand-orange font-bold uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-ping" />
                            Edge Compute
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                          Deploying light vision networks locally on Android and iOS devices using highly optimized TFLite pipelines.
                        </p>
                      </div>

                      <div className="bg-zinc-950 p-5 border border-zinc-900 space-y-2.5 rounded-none">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Academic Standing</h4>
                          <span className="flex items-center gap-1.5 text-[8px] font-mono text-emerald-400 font-bold uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Cumulative GWA
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                          Maintained an elite 1.28 GWA across rigorous coursework including Discrete Math, Data Structures, and advanced Web Engineering.
                        </p>
                      </div>
                    </>
                  )}

                  {activeTab === "metrics" && (
                    <>
                      <div className="bg-zinc-950 p-5 border border-zinc-900 space-y-2.5 rounded-none">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Backend Orchestration</h4>
                          <span className="flex items-center gap-1.5 text-[8px] font-mono text-brand-orange font-bold uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-ping" />
                            REST / Sockets
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                          Developing JWT-secured APIs, Socket.io event buses, and PostgreSQL schemas designed for multi-user transaction engines.
                        </p>
                      </div>

                      <div className="bg-zinc-950 p-5 border border-zinc-900 space-y-2.5 rounded-none">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Frontend Architectures</h4>
                          <span className="flex items-center gap-1.5 text-[8px] font-mono text-emerald-400 font-bold uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Flutter / React
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                          Building cross-platform user interfaces that deliver hardware-accelerated rendering and modern declarative state synchronization.
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Tab Content Bottom Bar */}
              <div className="pt-6 mt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px]">
                
                {/* Active log display */}
                <div className="flex items-center gap-3">
                  <span className="border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-zinc-500 font-bold uppercase tracking-wider">
                    {activeTab === "persona" ? "Operational Log" : activeTab === "academic" ? "Academic Log" : "Metrics Log"}
                  </span>
                  <span className="text-zinc-400 font-bold uppercase tracking-wider">
                    {activeTab === "persona" && "Status: Stable (Evaluated 2026)"}
                    {activeTab === "academic" && "Status: Outstanding (Val. 2026)"}
                    {activeTab === "metrics" && "Status: Verified (Sync 2026)"}
                  </span>
                </div>

                {/* Diagnostic Compilation Status */}
                <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-[8px]">
                  {/* Waveform/Pulse Visual simulation */}
                  <svg className="w-16 h-3 text-brand-orange animate-pulse" viewBox="0 0 60 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5H10L14 1L18 9L22 3L25 7L28 5H60" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  {activeTab === "persona" && "Diagnostic Framework Compiled"}
                  {activeTab === "academic" && "Scholastic Indexed"}
                  {activeTab === "metrics" && "Engine Verified"}
                </div>

            </div>
          </div>
        </motion.div>

      </div>

    </div>
  </section>
  );
}

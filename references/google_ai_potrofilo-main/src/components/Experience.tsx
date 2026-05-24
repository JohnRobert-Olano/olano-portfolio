import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExperienceNode } from "../types";
import { Briefcase, GraduationCap, ChevronDown, ChevronUp, Calendar, BookOpen, Star, Sparkles } from "lucide-react";

const EXPERIENCES: ExperienceNode[] = [
  {
    id: "associate-se",
    role: "Associate Software Engineer & AI Builder",
    company: "Freelance / Contracting Partner",
    companyUrl: undefined,
    duration: "2025 - Present",
    description: "Architecting modern web-enabled systems, configuring high-frequency API routes, and designing lightweight client architectures for enterprise projects and developer workflows.",
    highlights: [
      "Engineered full-stack telemetry and AI capabilities securely matching code-safety guidelines.",
      "Accelerated complex codebase prototyping and debugging using state-of-the-art agentic engineering workflows (Antigravity, Cursor, Claude Code).",
      "Deployed high-performance, responsive UI systems built with React, Vite, Node.js, and Express.",
    ],
    skills: ["TypeScript", "React", "Vite", "Node.js", "Express", "Tailwind CSS", "Git"],
  },
  {
    id: "volunteer-ccf",
    role: "Live Production Volunteer",
    company: "Christ’s Commission Fellowship - Alabang, Muntinlupa",
    companyUrl: undefined,
    duration: "June 2019 – May 2026",
    description: "Assisted with end-to-end event production, audio engineering, and technical troubleshooting to ensure stable, high-fidelity services.",
    highlights: [
      "Assisted with technical support for teachers and staff by troubleshooting and maintaining laptops and support hardware before and during sessions.",
      "Managed live audio systems for worship and performances, guaranteeing high-quality sound delivery throughout multi-speaker events.",
      "Created and operated clean visual presentation slides, elevating the overall visual experience of worship sessions and stage presentations.",
    ],
    skills: ["Sound Systems", "Hardware Maintenance", "Troubleshooting", "Presentation UX", "Technical Support"],
  },
  {
    id: "academic",
    role: "Candidate for B.S. in Computer Science",
    company: "Cavite State University – Imus Campus",
    companyUrl: undefined,
    duration: "2022 – 2026 (Final Semester)",
    description: "Pursuing specialized degree track with an exceptional academic record, specializing in data structures, algorithms, and applied neural systems.",
    highlights: [
      "High Academic Standing: Cumulative GWA of 1.28 (evaluated through 3rd Year, 2nd Semester).",
      "Senior Thesis: Developed a custom MobileNet Transfer Learning Approach in Classifying Common External Eye Diseases.",
      "Rigorous Coursework: Advanced Machine Learning, Data Structures & Algorithms, Programming Languages, Software Testing & Quality Assurance, Discrete Mathematics, Web Development.",
    ],
    skills: ["Data Structures", "Algorithms", "Linear Algebra", "Probability & Statistics", "C++", "SQL"],
  },
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string>("associate-se");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <section id="experience" className="relative py-24 px-6 lg:px-24 bg-[#050505] border-t border-zinc-900 tech-grid-bg">
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[110px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Title Group */}
        <div id="experience-header" className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-brand-orange font-mono text-xs tracking-[0.2em] uppercase font-bold">
            <Briefcase className="w-4 h-4 text-brand-orange" />
            03 / PROFESSIONAL MILESTONES
          </div>
          
          <h2 className="font-display text-[45px] md:text-[64px] font-black uppercase tracking-tight leading-none text-white">
            System <span className="text-transparent text-outline">History.</span>
          </h2>
          <p className="text-zinc-400 font-serif text-base max-w-lg mx-auto italic leading-relaxed">
            Architectural track record tracing J.R.'s transition from rigorous computer science theory to active client-edge AI implementations.
          </p>
        </div>

        {/* Vertical Timeline container - sleek monochrome borders */}
        <div id="experience-timeline" className="relative border-l border-zinc-850 pl-6 md:pl-10 space-y-10 ml-4">
          
          {EXPERIENCES.map((node, index) => {
            const isAcademic = node.id === "academic";
            const isExpanded = expandedId === node.id;

            return (
              <motion.div
                id={`timeline-node-${node.id}`}
                key={node.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative text-left"
              >
                {/* Node visual icon indicator on the line */}
                <div 
                  className={`absolute -left-[35px] md:-left-[54px] top-1.5 w-5 h-5 md:w-7 md:h-7 rounded-none flex items-center justify-center border transition-all duration-300 ${
                    isExpanded 
                      ? "bg-brand-orange border-brand-orange text-black font-black" 
                      : "bg-[#050505] border-zinc-805 text-zinc-500"
                  }`}
                >
                  {isAcademic ? (
                    <GraduationCap className="w-3 h-3 md:w-3.5 h-3.5" />
                  ) : (
                    <Briefcase className="w-3 h-3 md:w-3.5 h-3.5" />
                  )}
                </div>

                {/* Main Node Box with sharp corners */}
                <div 
                  id={`timeline-card-${node.id}`}
                  onClick={() => toggleExpand(node.id)}
                  className={`relative p-6 md:p-8 rounded-sm border cursor-pointer transition-all duration-300 ${
                    isExpanded 
                      ? "bg-zinc-950 border-brand-orange shadow-2xl" 
                      : "bg-zinc-950/30 border-zinc-900 hover:border-zinc-800"
                  }`}
                >
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="font-display font-black uppercase text-lg md:text-xl text-white tracking-tight">
                        {node.role}
                      </h3>
                      <div className="text-sm font-serif italic text-zinc-400">
                        {node.company}
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase font-bold px-3 py-1.5 rounded-sm self-start md:self-center">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                      {node.duration}
                    </div>
                  </div>

                  {/* Summary text */}
                  <p className="mt-4 text-zinc-400 text-sm leading-relaxed font-light">
                    {node.description}
                  </p>

                  {/* Expand-Collapse Toggle indicators */}
                  <div className="mt-5 pt-3 border-t border-zinc-900/50 flex items-center justify-between text-[10px] text-zinc-500 font-mono uppercase font-bold">
                    <span className="text-brand-orange">
                      {isExpanded ? "[ Click to shrink matrix ]" : "[ Click to expand matrix ]"}
                    </span>
                    <div className="p-1 rounded-sm bg-zinc-900 border border-zinc-800">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-brand-orange" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                      )}
                    </div>
                  </div>

                  {/* Collapsible highlights */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        id={`timeline-highlights-${node.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-6 pt-6 border-t border-zinc-905 space-y-6"
                      >
                        
                        {/* Achievements */}
                        <div className="space-y-3">
                          <h4 className="font-display font-black text-white text-xs uppercase tracking-widest flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-brand-orange" />
                            CORE ACCOMPLISHMENTS
                          </h4>
                          <ul className="space-y-2.5">
                            {node.highlights.map((highlight, hIndex) => (
                              <li key={hIndex} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed font-light">
                                <span className="text-brand-orange mt-0.5">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech list */}
                        <div className="space-y-3">
                          <h4 className="font-display font-black text-white text-xs uppercase tracking-widest flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                            TECHNOLOGY PROTOCOLS
                          </h4>
                          
                          <div className="flex flex-wrap gap-2">
                            {node.skills.map((skill) => (
                              <span 
                                key={skill} 
                                className="text-[9px] font-mono tracking-wider bg-zinc-905 border border-zinc-800 px-2.5 py-1 rounded-none text-zinc-300 font-bold uppercase"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

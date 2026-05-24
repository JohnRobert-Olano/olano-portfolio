import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { ExternalLink, Github, Sparkles, Filter, X, Award, Zap, Code, ArrowRight } from "lucide-react";

const PROJECTS_DATA: Project[] = [
  {
    id: "optitrace",
    title: "OptiTrace: Diagnostic Ecosystem",
    description: "AI-powered ophthalmological diagnostics using fine-tuned EfficientNet-B0 and MobileNetV3 architectures and explainable Grad-CAM heatmaps.",
    longDescription: "An end-to-end, cross-platform diagnostic suite engineered to democratize eye care. OptiTrace combines iOS & Android applications built with Flutter to execute real-time, offline classification of common external eye diseases (such as Pterygium and Stye) with up to 97.8% accuracy. Operates fine-tuned EfficientNetB0 and MobileNetV3 architectures on mobile CPUs using highly optimized dual-output pipelines to render explainable Grad-CAM saliency heatmaps. Paired with a secure Next.js and TypeScript admin dashboard utilizing Recharts, this system turns localized screening data into actionable clinical insights for verified doctors.",
    tags: ["Computer Vision", "AI Systems", "Flutter", "Next.js"],
    metrics: [
      { label: "ML Accuracy", value: "97.8%" },
      { label: "Internal GWA Score", value: "GWA 1.28" },
      { label: "Grad-CAM Heatmaps", value: "Native CPU" },
    ],
    featured: true,
  },
  {
    id: "nova-lms",
    title: "Nova: Messaging LMS",
    description: "Scalable Learning Management System powered by a secure Node.js REST API and highly optimized Socket.IO multi-state channels.",
    longDescription: "Nova rearchitects the virtual classroom experience with scalable course delivery and embedded communication channels. Built on top of a secure Node.js/Express backend paired with PostgreSQL, the system implements granular JWT-signed authentication and Role-Based Access Control (RBAC) to handle complex organizational workflows. Its real-time chat module manages distributed client state sync via Socket.IO, elegantly managing event-based message forwarding, custom reactions, full notifications, and soft deletes. Accelerates operational workloads through advanced database functions for scoring and enrollment states.",
    tags: ["Full Stack", "Node.js", "Express", "PostgreSQL"],
    metrics: [
      { label: "Authentication Gate", value: "JWT + RBAC" },
      { label: "Socket Sync Lag", value: "<15ms" },
      { label: "Database Layer", value: "PostgreSQL" },
    ],
    featured: true,
  },
];

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Model-level state for interactive simulations inside detail modal
  const [visionConfidence, setVisionConfidence] = useState<number>(85);
  const [aiSketchPrompt, setAiSketchPrompt] = useState<string>("UserMessageEvent: { text: 'Hello, J.R.!', reaction: 'fire' }");
  const [isSimulatingAI, setIsSimulatingAI] = useState<boolean>(false);
  const [simulatedLayout, setSimulatedLayout] = useState<string>("");

  const filteredProjects = selectedTag === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.tags.includes(selectedTag) || (selectedTag === "Computer Vision" && p.tags.includes("Computer Vision")) || (selectedTag === "AI Systems" && p.tags.includes("AI Systems")) || (selectedTag === "Full Stack" && p.tags.includes("Full Stack")));

  // Custom simulation triggers
  const handleSimulateAI = () => {
    setIsSimulatingAI(true);
    setSimulatedLayout("");
    setTimeout(() => {
      setIsSimulatingAI(false);
      setSimulatedLayout("Socket.io transmission secure. Event [MessageSent] acknowledged by Node.js/Express server. Soft delete coordinates indexed successfully. Broadcast payload distributed to active course members in <11ms.");
    }, 1500);
  };

  return (
    <section id="projects" className="relative py-24 px-6 lg:px-24 bg-brand-dark border-t border-zinc-900">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <div id="projects-header" className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-orange font-mono text-xs tracking-[0.2em] uppercase font-bold">
              <Code className="w-4 h-4 text-brand-orange" />
              02 / SELECTED DIRECTORY
            </div>
            
            <h2 className="font-display text-[45px] md:text-[64px] font-black uppercase tracking-tight leading-none text-white">
              Creative <span className="text-transparent text-outline">Showcase.</span>
            </h2>
            <p className="text-zinc-400 font-serif text-base max-w-xl italic leading-relaxed">
              A precise exploration of hardware-aware machine learning frameworks, modular compilers, and custom full-stack software applications.
            </p>
          </div>

          {/* Filtering Tabs - Sharp modern styling */}
          <div id="project-filters" className="flex flex-wrap gap-1 bg-zinc-950 border border-zinc-900 p-1.5 rounded-sm self-start">
            {["All", "Computer Vision", "AI Systems", "Full Stack"].map((tag) => (
              <button
                id={`filter-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-[10px] uppercase font-mono tracking-wider px-4 py-2.5 rounded-sm transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-brand-orange text-black font-black"
                    : "text-zinc-500 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Sharp cards */}
        <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                id={`project-card-${project.id}`}
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => {
                  setActiveProject(project);
                  setSimulatedLayout(""); 
                }}
                className="group relative flex flex-col justify-between bg-zinc-950 border border-zinc-900 hover:border-brand-orange p-8 rounded-sm cursor-pointer shadow-xl transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Category and Featured badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.tags.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[9px] font-mono tracking-wider bg-zinc-900 border border-zinc-800 uppercase px-2 py-1 text-zinc-400 font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.featured && (
                      <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 uppercase rounded-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Info Panel */}
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white group-hover:text-brand-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Grid performance statistics */}
                <div className="mt-8 pt-6 border-t border-zinc-900 grid grid-cols-3 gap-4 items-center">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-left space-y-1">
                      <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{metric.label}</p>
                      <p className="text-lg font-display font-black text-white group-hover:text-brand-orange transition-colors">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-brand-orange transition-all flex items-center gap-1.5">
                    Explore Studio Space
                    <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                  </span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sharp Project Detail Drawer */}
        <AnimatePresence>
          {activeProject && (
            <div id="project-detail-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                id="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="absolute inset-0 bg-brand-dark/95"
              />

              <motion.div
                id="project-modal-container"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 15 }}
                className="relative bg-zinc-950 border border-zinc-800 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm shadow-2xl z-10"
              >
                {/* Close handle */}
                <button
                  id="btn-close-modal"
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 right-6 p-2.5 bg-zinc-900 hover:bg-brand-orange hover:text-black border border-zinc-850 rounded-sm text-zinc-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Drawer Interior */}
                <div className="p-8 md:p-12 space-y-8">
                  
                  <div className="space-y-4 pr-12">
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((t, i) => (
                        <span key={i} className="text-[9px] font-mono uppercase bg-zinc-900 border border-zinc-850 px-3 py-1 text-zinc-300 font-bold">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                      {activeProject.title}
                    </h3>
                  </div>

                  {/* Case metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-zinc-800 bg-zinc-950 divide-y sm:divide-y-0 sm:divide-x divide-zinc-850 p-6">
                    {activeProject.metrics.map((m, i) => (
                      <div key={i} className="flex items-center gap-4 py-3 sm:py-0 sm:px-4">
                        <div className="w-9 h-9 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-orange">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{m.label}</p>
                          <p className="text-lg font-display font-black text-white">{m.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Descriptions with Playfair Serif elements */}
                  <div className="space-y-4">
                    <h4 className="font-display font-black text-white uppercase text-base tracking-widest flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Award className="w-4 h-4 text-brand-orange" />
                      SYSTEM ARCHITECTURE STUDY
                    </h4>
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
                      {activeProject.longDescription}
                    </p>
                  </div>

                  {/* INTERACTIVE COMPONENT PLAYGROUND */}
                  <div className="bg-zinc-950 border border-zinc-850 rounded-sm p-6 md:p-8 space-y-6 text-left">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-4">
                      <Sparkles className="w-4 h-4 text-brand-orange" />
                      <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-300">
                        Interactive Performance Calibration
                      </h5>
                    </div>

                    {activeProject.id === "optitrace" ? (
                      <div className="space-y-5">
                        <p className="text-xs text-zinc-400 leading-relaxed font-light">
                          OptiTrace adapts neural confidence outputs on-demand. Adjust the diagnostic precision threshold matrix slider to simulate live on-device MobileNetV3 / EfficientNet-B0 execution.
                        </p>
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-zinc-500 uppercase tracking-wider">Diagnostic Confidence Threshold</span>
                            <span className="text-brand-orange font-black">{visionConfidence}%</span>
                          </div>
                          <input
                            id="slider-threshold"
                            type="range"
                            min="50"
                            max="99"
                            value={visionConfidence}
                            onChange={(e) => setVisionConfidence(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-900 appearance-none cursor-pointer accent-brand-orange border border-zinc-800 rounded-none"
                          />
                        </div>
                        <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-sm flex flex-wrap gap-3 items-center text-xs font-mono text-zinc-400">
                          <span className="text-zinc-500 uppercase text-[10px] tracking-wider font-bold">ML Runtime Engine:</span>
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 font-bold uppercase text-[9px]">
                            {visionConfidence > 85 ? "Active: EfficientNet-B0 (97.8% Accuracy)" : "Active: MobileNetV3 (Rapid Mobile Inference)"}
                          </span>
                          <span className="bg-zinc-950 text-zinc-400 border border-zinc-800 px-2 py-0.5 text-[9px]">
                            Confidence GWA: {(98 - (100 - visionConfidence) * 0.35).toFixed(1)}%
                          </span>
                          <span className="bg-zinc-800 text-brand-orange px-2 py-0.5 text-[9px] font-bold">
                            CPU DELAY: {visionConfidence > 85 ? "12.4ms" : "7.2ms"}
                          </span>
                        </div>
                      </div>
                    ) : activeProject.id === "nova-lms" ? (
                      <div className="space-y-4">
                        <p className="text-xs text-zinc-400 font-light">
                          Initiate modular message transmission event to simulate real-time Socket.io active state distribution in J.R.'s Nova LMS engine.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            id="input-ai-sketch"
                            type="text"
                            value={aiSketchPrompt}
                            onChange={(e) => setAiSketchPrompt(e.target.value)}
                            placeholder="State message payload..."
                            className="flex-1 text-xs bg-zinc-900 border border-zinc-800 px-4 py-3 text-white font-mono focus:outline-none focus:border-brand-orange"
                          />
                          <button
                            id="btn-simulate-generator"
                            onClick={handleSimulateAI}
                            disabled={isSimulatingAI}
                            className="text-[10px] uppercase tracking-wider bg-brand-orange text-black font-black hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-650 transition px-6 py-3"
                          >
                            {isSimulatingAI ? "Broadcasting..." : "Transmit Payload"}
                          </button>
                        </div>
                        {isSimulatingAI && (
                          <div className="w-full bg-zinc-900 h-1 overflow-hidden rounded-none">
                            <div className="bg-brand-orange h-full animate-pulse" style={{ width: "75%" }} />
                          </div>
                        )}
                        {simulatedLayout && (
                          <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-sm">
                            <p className="font-mono text-xs text-emerald-400 select-all leading-relaxed">
                              {simulatedLayout}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-zinc-400 leading-normal font-light">
                          Optimized server cluster performance nodes telemetering standard ping states continuously.
                        </p>
                        <div className="bg-zinc-900 p-4 border border-zinc-850 text-xs font-mono text-zinc-400 space-y-1">
                          <p className="text-zinc-200 font-bold uppercase tracking-wider text-[10px]">✓ Automated Cluster Affirmation</p>
                          <p className="text-emerald-400">● 4/4 virtual environments in ideal sync.</p>
                          <p>● Mean coordinate latency ping: 4.8ms</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Foot navigation */}
                  <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-zinc-900 justify-between items-start sm:items-center text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      {activeProject.link && (
                        <a
                          id={`link-demo-${activeProject.id}`}
                          href={activeProject.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-brand-orange hover:underline font-bold uppercase tracking-wider"
                        >
                          Launch Active Live Demo
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <span className="text-zinc-500 flex items-center gap-1 font-mono text-[10px]">
                        <Github className="w-3.5 h-3.5 text-zinc-600" />
                        github.com/jrobertolano/{activeProject.id} (Private Cluster)
                      </span>
                    </div>

                    <button
                      id="btn-close-bottom"
                      onClick={() => setActiveProject(null)}
                      className="text-zinc-400 hover:text-white font-mono uppercase tracking-widest bg-zinc-900 px-5 py-2.5 border border-zinc-850 hover:bg-brand-orange hover:text-black transition-colors text-[10px]"
                    >
                      Close Space
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

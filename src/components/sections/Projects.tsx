"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section 
      id="projects"
      ref={containerRef} 
      className="py-32 relative z-10 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center text-white drop-shadow-sm">
          Featured Engineering
        </h2>
        
        <div className="flex flex-col gap-16 projects-wrapper">
          {portfolioData.projects.map((project) => (
            <article 
              key={project.id} 
              className="project-card spatial-glass p-8 md:p-10 transition-transform duration-500 hover:scale-[1.01]"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 border-b border-white/10 pb-4">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{project.title}</h3>
                <span className="text-white/40 text-sm font-medium mt-2 md:mt-0 tracking-widest uppercase">
                  {project.duration}
                </span>
              </div>
              
              <h4 className="text-white/80 font-medium text-lg mb-4 tracking-tight">
                {project.role}
              </h4>
              
              <p className="text-white/70 leading-relaxed mb-8 font-light text-lg">
                {project.description}
              </p>
              
              <div className="mb-8 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-1.5 text-xs font-medium tracking-wide bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-white/80 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <ul className="space-y-4">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-4 text-white/30 mt-1.5 text-xs">✦</span>
                    <span className="text-white/60 leading-relaxed text-sm md:text-base font-light">{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const timelineItems = gsap.utils.toArray(".timeline-item");
    
    timelineItems.forEach((item) => {
      gsap.from(item as Element, {
        scrollTrigger: {
          trigger: item as Element,
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef });

  return (
    <section 
      id="experience"
      ref={containerRef} 
      className="py-32 relative z-10 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center text-white drop-shadow-sm">
          Journey & Education
        </h2>
        
        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 pb-8">
          
          {portfolioData.education.map((edu) => (
            <div key={edu.id} className="timeline-item relative pl-8 md:pl-12">
              <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-white/50 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
              
              <article className="spatial-glass p-6 md:p-8 transition-transform duration-500 hover:scale-[1.01]">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3 border-b border-white/10 pb-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">{edu.institution}</h3>
                  <span className="text-white/40 text-sm font-medium mt-1 md:mt-0 tracking-widest uppercase">
                    {edu.duration}
                  </span>
                </div>
                
                <h4 className="text-white/80 font-medium tracking-tight mb-5 text-lg">
                  {edu.degree}
                </h4>
                
                <ul className="space-y-3">
                  {edu.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-white/30 mt-1 text-sm">✦</span>
                      <span className="text-white/60 leading-relaxed font-light">{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}

          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="timeline-item relative pl-8 md:pl-12">
              <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-white/50 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
              
              <article className="spatial-glass p-6 md:p-8 transition-transform duration-500 hover:scale-[1.01]">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3 border-b border-white/10 pb-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">{exp.company}</h3>
                  <span className="text-white/40 text-sm font-medium mt-1 md:mt-0 tracking-widest uppercase">
                    {exp.duration}
                  </span>
                </div>
                
                <h4 className="text-white/80 font-medium tracking-tight mb-4 text-lg">
                  {exp.role}
                </h4>
                
                <p className="text-white/70 leading-relaxed mb-6 font-light">
                  {exp.description}
                </p>
                
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-white/30 mt-1 text-sm">✦</span>
                      <span className="text-white/60 leading-relaxed font-light">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

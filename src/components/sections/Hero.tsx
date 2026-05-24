"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface RealHumanModelProps {
  onLoad: () => void;
  mouseCoordsRef: React.RefObject<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
  } | null>;
  scale?: number;
  offsetY?: number;
}

function RealHumanModel({ onLoad, mouseCoordsRef, scale = 10.3, offsetY = -1.2 }: RealHumanModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Load the GLTF model from the public directory
  const { scene } = useGLTF("/model.glb");

  // Call onLoad and recursively disable CPU-bound raycasting when model mounts
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.raycast = () => null; // Completely bypasses ThreeJS raycaster
        }
      });
      onLoad();
    }
  }, [scene, onLoad]);

  useFrame(() => {
    if (groupRef.current && mouseCoordsRef.current) {
      const { normalizedX, normalizedY } = mouseCoordsRef.current;
      
      // Subtle interactive mouse tracking (head turns to follow the user's cursor)
      const mouseOffsetX = (normalizedX * Math.PI) / 6;
      const mouseOffsetY = (normalizedY * Math.PI) / 10;

      // Smoothly interpolate current rotation to follow the cursor (0.18 for snappier reaction)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseOffsetX,
        0.18
      );
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseOffsetY,
        0.18
      );
    }
  });

  const headHeight = 1.786; // The exact unscaled height of the head bone in model.glb

  // Mathematically derived translation to align the head bone at the origin
  const primitivePosition: [number, number, number] = [0, -scale * headHeight + offsetY, 0];

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]}
    >
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <primitive object={scene} scale={scale} position={primitivePosition} />
      </Float>
    </group>
  );
}

interface RevealLayerProps {
  cursorX: number;
  cursorY: number;
  radius: number;
  bgImage2: string;
  heightScale?: number;
  offsetX?: number;
  offsetY?: number;
}

function RevealLayer({ 
  cursorX, 
  cursorY, 
  radius, 
  bgImage2, 
  heightScale = 150,
  offsetX = 2.7,
  offsetY = -65.3
}: RevealLayerProps) {
  return (
    <>
      {/* Hardware-accelerated SVG spotlight mask (zero CPU rendering lag) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <radialGradient
            id="spotlight-gradient"
            gradientUnits="userSpaceOnUse"
            cx={cursorX}
            cy={cursorY}
            r={radius}
            fx={cursorX}
            fy={cursorY}
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="white" stopOpacity="0.75" />
            <stop offset="75%" stopColor="white" stopOpacity="0.4" />
            <stop offset="88%" stopColor="white" stopOpacity="0.12" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="spotlight-mask" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="4000" height="4000">
            <circle
              cx={cursorX}
              cy={cursorY}
              r={radius}
              fill="url(#spotlight-gradient)"
            />
          </mask>
        </defs>
      </svg>

      <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat pointer-events-none z-20"
        style={{
          backgroundImage: `url(${bgImage2})`,
          backgroundSize: `auto ${heightScale}%`,
          backgroundPosition: `calc(50% + ${offsetX}%) calc(50% + ${offsetY}%)`,
          maskImage: "url(#spotlight-mask)",
          WebkitMaskImage: "url(#spotlight-mask)",
          opacity: Math.min(radius / 50, 1),
        }}
      />
    </>
  );
}

// Preload the model for better performance
useGLTF.preload("/model.glb");

const HERO_TEXTS = ["Future", "UIs", "Apps", "Web", "Agents"];

export default function Hero() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [clickActive, setClickActive] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHoveredRef = useRef(false);

  // Smooth mouse tracking refs
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const gridOffset = useRef({ x: 0, y: 0 });
  const radiusRef = useRef(0);
  const mouseActive = useRef(false);

  // cursorPos state containing x, y, and radius for RevealLayer
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, radius: 0 });

  // Shared coordinates ref for zero-latency 3D + 2D synchronization
  const mouseCoordsRef = useRef<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
  } | null>(null);

  // Initialize mouse position to center of screen on mount
  useEffect(() => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    mouse.current = { x, y };
    smooth.current = { x, y };
    setCursorPos({ x, y, radius: 0 });
  }, []);

  // Centralized requestAnimationFrame loop for smooth easing and rendering
  useEffect(() => {
    let animId: number;

    const update = () => {
      // Ease smooth ref toward mouse with factor 0.1
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;

      // Ease spotlight radius (0 when not hovered, 260 when hovered, and only if mouse is active)
      const targetRadius = (isHoveredRef.current && mouseActive.current) ? 260 : 0;
      radiusRef.current += (targetRadius - radiusRef.current) * 0.15;

      if (sectionRef.current) {
        const rectSection = sectionRef.current.getBoundingClientRect();
        
        // Compute normalized coordinates relative to section card: cx, cy (-0.5 to 0.5)
        const cx = (smooth.current.x - rectSection.left) / rectSection.width - 0.5;
        const cy = (smooth.current.y - rectSection.top) / rectSection.height - 0.5;

        // Ease gridOffset toward cx * 16 / cy * 16 with factor 0.06
        gridOffset.current.x += (cx * 16 - gridOffset.current.x) * 0.06;
        gridOffset.current.y += (cy * 16 - gridOffset.current.y) * 0.06;

        // Update the SVG pattern position directly via DOM attribute manipulation
        if (patternRef.current) {
          patternRef.current.setAttribute("x", gridOffset.current.x.toString());
          patternRef.current.setAttribute("y", gridOffset.current.y.toString());
        }

        // Synchronize normalized coordinates with Three.js mouseCoordsRef
        if (containerRef.current) {
          const rectContainer = containerRef.current.getBoundingClientRect();
          const cxContainer = (smooth.current.x - rectContainer.left) / rectContainer.width - 0.5;
          const cyContainer = (smooth.current.y - rectContainer.top) / rectContainer.height - 0.5;

          mouseCoordsRef.current = {
            x: smooth.current.x - rectContainer.left,
            y: smooth.current.y - rectContainer.top,
            normalizedX: cxContainer * 2,
            normalizedY: -cyContainer * 2, // Invert Y for Three.js coordinates
          };

          // Update cursorPos state relative to container coordinates
          setCursorPos({
            x: smooth.current.x - rectContainer.left,
            y: smooth.current.y - rectContainer.top,
            radius: radiusRef.current,
          });
        }
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    mouseActive.current = true;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 2D Ellipsoid Hover Detection centered on the body/torso + head
    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    const horizontalRadius = rect.width * 0.25;
    const verticalRadius = rect.height * 0.35;
    
    const normalizedDistance = (dx * dx) / (horizontalRadius * horizontalRadius) + 
                               (dy * dy) / (verticalRadius * verticalRadius);

    const isInside = normalizedDistance <= 1.0;
    
    if (isInside !== isHoveredRef.current) {
      isHoveredRef.current = isInside;
    }
  };

  const handleClick = () => {
    setClickActive(true);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setClickActive(false);
    }, 2500); // 2.5 seconds click reveal morph duration
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div id="hero-section" className="p-2 md:p-4 bg-brand-dark relative">
      <section 
        ref={sectionRef}
        className="relative w-full h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)] bg-brand-dark overflow-hidden rounded-none border border-zinc-900 shadow-2xl pointer-events-auto tech-grid-bg"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { 
          isHoveredRef.current = false; 
        }}
      >
        {/* Dynamic ambient backlights using theme orange */}
        <div id="glow-orange" className="absolute top-[15%] left-[-5%] w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[130px] pointer-events-none" />
        <div id="glow-dark" className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-zinc-800/10 rounded-full blur-[135px] pointer-events-none" />

        {/* Layer 1: Solid Massive Text (Behind the Avatar) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-1">
          <h1 className="font-display text-[30vw] md:text-[25vw] font-black tracking-tighter text-white select-none whitespace-nowrap leading-none uppercase">
            olano
          </h1>
        </div>

        {/* Layer 2: Interactive 3D Avatar (Middle layer) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div 
            ref={containerRef}
            className="relative w-full h-[100vh] md:w-[60vw] md:h-[120vh] flex items-center justify-center pointer-events-auto"
          >
            {/* Static image layer (Fallback / loading state) */}
            <div 
              ref={avatarRef}
              className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0
                ${!modelLoaded ? "opacity-60 blur-[6px] scale-[1.02] animate-pulse transition-all duration-300" : ""}`}
              style={!modelLoaded ? {} : { opacity: 0, visibility: 'hidden' }}
            >
              <img 
                src="/avatar.png" 
                alt="Avatar" 
                className="w-full h-full object-contain max-h-[80vh]" 
              />
            </div>
            
            {/* 3D Canvas layer: rendering the 3D model */}
            <div 
              ref={canvasContainerRef}
              className={`w-full h-full pointer-events-auto cursor-pointer transition-opacity duration-300
                ${modelLoaded ? "opacity-100" : "opacity-0"}`}
              onClick={handleClick}
            >
              <Canvas 
                dpr={[1, 1.5]}
                gl={{ powerPreference: "high-performance", antialias: true }}
                camera={{ position: [0, 0, 9], fov: 45 }} 
              >
                <ambientLight intensity={1.5} color="#ffffff" />
                <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
                <directionalLight position={[-10, -10, -10]} intensity={1} color="#a0c4ff" />

                <Suspense fallback={null}>
                  <RealHumanModel 
                    onLoad={() => setModelLoaded(true)} 
                    mouseCoordsRef={mouseCoordsRef} 
                    scale={10.3}
                    offsetY={-1.2}
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* Reveal spotlight layer rendering the avatar image masked over the 3D model */}
            {modelLoaded && (
              <RevealLayer 
                cursorX={cursorPos.x} 
                cursorY={cursorPos.y} 
                radius={cursorPos.radius}
                bgImage2="/avatar.png" 
                heightScale={150}
                offsetX={2.7}
                offsetY={-65.3}
              />
            )}
          </div>
        </div>

        {/* Layer 3: Outline Massive Text (In front of Avatar) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            aria-hidden="true"
            className="font-display text-[30vw] md:text-[25vw] font-black tracking-tighter select-none whitespace-nowrap leading-none uppercase"
            style={{
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
            }}
          >
            olano
          </div>
        </div>

        {/* Top Left: Headline & Greeting */}
        <div className="absolute top-8 left-6 md:top-16 md:left-16 z-30 max-w-[90%] md:max-w-xl pointer-events-none">
          <p className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase mb-4 md:mb-6 font-bold">
            Hi, I&apos;m J.R. Olano &mdash; ASSOCIATE SE
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] flex flex-col items-start uppercase">
            <span>Let&apos;s Build</span>
            <span className="flex items-baseline gap-x-2.5 md:gap-x-4">
              <span>The</span>
              <span className="inline-flex relative w-[180px] sm:w-[240px] md:w-[320px] align-baseline">
                <GooeyText
                  texts={HERO_TEXTS}
                  morphTime={2.5}
                  cooldownTime={2.5}
                  className="w-full pointer-events-auto"
                  contentClassName="justify-start items-baseline"
                  textClassName="font-display text-white font-black text-5xl md:text-6xl lg:text-7xl items-baseline justify-start tracking-tight"
                />
              </span>
            </span>
          </h2>
        </div>



        {/* Bottom Right: About Me Link */}
        <div className="absolute bottom-8 right-6 md:bottom-16 md:right-16 z-30 pointer-events-auto">
          <a href="#about" className="group">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-brand-orange transition-all flex items-center gap-1.5 cursor-pointer bg-zinc-950/70 border border-zinc-900 px-5 py-3 hover:border-brand-orange hover:shadow-[0_0_15px_rgba(242,125,38,0.05)] transition-all duration-300">
              About Me
              <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
            </span>
          </a>
        </div>

      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function WebBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Use ResizeObserver for robust sizing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;

      // Debounce the update slightly to protect performance on quick resizes
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({ width, height });
      }, 100);
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Run the physics simulation & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const pointsCount = Math.min(65, Math.floor((dimensions.width * dimensions.height) / 18000));
    const points: Point[] = [];

    // Initialize points
    for (let i = 0; i < pointsCount; i++) {
      points.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Render subtle radial background gradient
      const gradient = ctx.createRadialGradient(
        dimensions.width / 2,
        dimensions.height / 2,
        0,
        dimensions.width / 2,
        dimensions.height / 2,
        Math.max(dimensions.width, dimensions.height) * 0.8
      );
      gradient.addColorStop(0, "#060919");
      gradient.addColorStop(0.5, "#030408");
      gradient.addColorStop(1, "#010204");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Simulating subtle web grid lines in canvas directly
      ctx.strokeStyle = "rgba(227, 45, 45, 0.015)";
      ctx.lineWidth = 0.5;
      const step = 60;
      for (let x = 0; x < dimensions.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      for (let y = 0; y < dimensions.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Update and draw points
      points.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Bounce off canvas margins
        if (pt.x < 0 || pt.x > dimensions.width) pt.vx *= -1;
        if (pt.y < 0 || pt.y > dimensions.height) pt.vy *= -1;

        // Clip constraints
        pt.x = Math.max(0, Math.min(pt.x, dimensions.width));
        pt.y = Math.max(0, Math.min(pt.y, dimensions.height));

        // Interaction with mouse pointer
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - pt.x;
          const dy = mouseRef.current.y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            // Gentle gravitational pull to the cursor
            const force = (180 - dist) / 180;
            pt.x += (dx / dist) * force * 0.5;
            pt.y += (dy / dist) * force * 0.5;
          }
        }

        // Render point node
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(227, 45, 45, 0.4)";
        ctx.fill();
      });

      // Draw standard spider network lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];

        // Draw connections to current mouse coordinates
        if (mouseRef.current.active) {
          const mdx = mouseRef.current.x - p1.x;
          const mdy = mouseRef.current.y - p1.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 200) {
            const alpha = (1 - mdist / 200) * 0.35;
            ctx.strokeStyle = `rgba(227, 45, 45, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // If close enough, draw connection lines
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.18;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dimensions]);

  return (
    <div id="web-bg-container" ref={containerRef} className="absolute inset-0 w-full h-full -z-10 bg-[#030408]">
      <canvas id="web-canvas" ref={canvasRef} className="block w-full h-full opacity-60 pointer-events-none" />
    </div>
  );
}

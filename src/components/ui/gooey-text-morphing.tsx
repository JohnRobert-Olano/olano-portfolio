"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
  contentClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
  contentClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  // Stabilize the texts array to prevent effect re-runs when array reference changes but content is identical
  const serializedTexts = JSON.stringify(texts);
  const stableTexts = React.useMemo(() => {
    return JSON.parse(serializedTexts) as string[];
  }, [serializedTexts]);

  React.useEffect(() => {
    if (!stableTexts || stableTexts.length === 0) return;
    
    // Initialize starting index at stableTexts.length - 1 so the first transition is stableTexts[0] -> stableTexts[1]
    let textIndex = stableTexts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let animationFrameId: number;

    // Easing function for smooth ease-in-out transitions
    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        const eased2 = easeInOutQuad(fraction);
        const eased1 = easeInOutQuad(1 - fraction);

        // Cap the blur at 16px to keep it inside the color matrix visibility threshold
        text2Ref.current.style.filter = `blur(${Math.min(8 / eased2 - 8, 16)}px)`;
        text2Ref.current.style.opacity = `${eased2 * 100}%`;

        text1Ref.current.style.filter = `blur(${Math.min(8 / eased1 - 8, 16)}px)`;
        text1Ref.current.style.opacity = `${eased1 * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % stableTexts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = stableTexts[textIndex % stableTexts.length];
            text2Ref.current.textContent = stableTexts[(textIndex + 1) % stableTexts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [stableTexts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter 
            id="threshold" 
            x="-50%" 
            y="-50%" 
            width="200%" 
            height="200%" 
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={cn("w-full h-full relative flex", contentClassName)}
        style={{ 
          filter: "url(#threshold)",
          transform: "translate3d(0,0,0)",
          willChange: "filter, transform"
        }}
      >
        {/* Hidden in-flow word to establish natural font height and baseline */}
        <span
          className={cn(
            "invisible select-none pointer-events-none whitespace-nowrap antialiased",
            textClassName
          )}
        >
          {stableTexts[0] || ""}
        </span>

        {/* Absolute morphing spans positioned on top (pre-loaded with texts[texts.length-1] and texts[0]) */}
        <span
          ref={text1Ref}
          className={cn(
            "absolute inset-0 flex select-none whitespace-nowrap antialiased",
            textClassName
          )}
          style={{ opacity: 0 }}
        >
          {stableTexts[stableTexts.length - 1] || ""}
        </span>
        <span
          ref={text2Ref}
          className={cn(
            "absolute inset-0 flex select-none whitespace-nowrap antialiased",
            textClassName
          )}
          style={{ opacity: "100%" }}
        >
          {stableTexts[0] || ""}
        </span>
      </div>
    </div>
  );
}

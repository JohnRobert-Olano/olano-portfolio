import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export type RevealPosition = "above" | "below" | "inside";

export function useScrollReveal(amount = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount });
  const [position, setPosition] = useState<RevealPosition>("below");

  useEffect(() => {
    if (isInView) {
      setPosition("inside");
    } else {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // Check if the top of the element is above the top of the viewport
        if (rect.top < 0) {
          setPosition("above");
        } else {
          setPosition("below");
        }
      }
    }
  }, [isInView]);

  return { ref, position };
}

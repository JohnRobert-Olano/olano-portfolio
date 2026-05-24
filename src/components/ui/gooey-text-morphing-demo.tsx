import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

function GooeyTextDemo() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <GooeyText
        texts={["Design", "Engineering", "Is", "Awesome"]}
        morphTime={1}
        cooldownTime={0.25}
        className="w-full h-full pointer-events-auto"
        contentClassName="justify-center items-center"
        textClassName="text-white text-4xl md:text-6xl font-extrabold tracking-tight items-center justify-center"
      />
    </div>
  );
}

export { GooeyTextDemo };

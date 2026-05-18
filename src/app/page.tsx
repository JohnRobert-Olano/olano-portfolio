import HeroCanvas from "@/components/canvas/HeroCanvas";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative overflow-x-hidden">
      <HeroCanvas />
      <Hero />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}

# Project Core Instructions: Portfolio Website (Bold Typography & Swiss Modernist)

## Context & Persona
You are acting as an expert Next.js and frontend architect. Your goal is to generate clean, highly performant code that aligns with a bold, high-contrast Bold Typography / Swiss Modernist design theme.

## Tech Stack
* **Core Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **3D & WebGL:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Animation Engine:** GSAP (using React physics spring values / motion/react where applicable)

## Design System & UI/UX Guidelines
Here is a description of the core design elements, layout principles, and styling tokens utilized to achieve this aesthetic:

### 1. Color Palette & Atmospheric Baseline
* **Cosmic Charcoal (#050505):** Used as the primary canvas color. It provides a pure, zero-glare backplane that allows other elements to stand out.
* **Tactical Accent Orange (#F27D26):** Selected because it is a highly visible color frequently used in physical industrial systems. It is reserved for critical CTA buttons, active state indicators, and specialized UI system badges.
* **Matte Zinc & White (#101012, #1f1f23, #FFFFFF):** Used for containers, borders, and text selection, ensuring high contrast and clean visual hierarchy without relying on color clutter.

### 2. Typographic Pairings
* **Display Typography (Outfit & Arial):** Set using ultra-bold, uppercase tracking (`leading-[0.85] font-black uppercase tracking-[-0.05em]`) for display headings.
* **Display Text Stroke:** Incorporates dynamic transparent outlined letters via CSS stroke effects (e.g. *Designing The Future*) to create visual depth and a professional agency feel.
* **Editorial Block Serifs (Georgia / Serif):** Elegant serif accents used on highlighted statements (e.g., the system study statement) to create structural variety.
* **Technical Monospace (JetBrains Mono):** Applied strictly for metadata, section coordinates (e.g. `01 / PROJECTS`), confidence metrics, and data outputs to resemble real engineering monitors.

### 3. Layout Patterns & Spatial Discipline
* **Structured Negative Space:** Relies on generous cushions of space rather than dividers to create rhythm and separate distinct context groupings.
* **Brutalist Flat Containers:** All buttons, cards, input text-fields, and dropdown elements utilize solid flat geometry with sharp corners, completely removing soft rounded elements to support the Swiss aesthetic.
* **Technical Grid Overlay:** Underlying CSS grid matrices (`tech-grid-bg`) styled with very faint horizontal and vertical lines, mirroring drafting tables and blueprint grids.

### 4. Custom Architectural Components
* **Interactive Cybernetic Visor:** A responsive, fully hand-shaped SVG matte-gray helmet with radial orange gradients. It uses React physics spring values (`motion/react`) to rotate inside its 3D canvas coordinates following your cursor movements.
* **Segmented Performance Matrix:** Active projects showcase real-time interactive parameters—featuring high-speed diagnostic threshold sliders and live simulated Socket.IO payload streams.
* **Connected Cognitive Drawer:** The floating AI assistant mimics a tactical terminal console with inline suggestion selectors, a flushable memory bank, and clear telemetry system-state trackers.

## Strict Development Rules
1. Strictly use Tailwind CSS utility classes natively via CSS or standard markup.
2. Maintain brutalist flat styling for all elements (no rounded corners, sharp borders, high contrast).
3. Keep the layout grid-aligned, using structured negative space instead of cosmetic borders or dividers.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Design & Aesthetic Theme

This portfolio application implements a **Bold Typography / Swiss Modernist** design theme. Here is a description of the core design elements, layout principles, and styling tokens utilized to achieve this aesthetic:

### 1. Color Palette & Atmospheric Baseline
* **Cosmic Charcoal (#050505):** Used as the primary canvas color. It provides a pure, zero-glare backplane that allows other elements to stand out.
* **Tactical Accent Orange (#F27D26):** Selected because it is a highly visible color frequently used in physical industrial systems. It is reserved for critical CTA buttons, active state indicators, and specialized UI system badges.
* **Matte Zinc & White (#101012, #1f1f23, #FFFFFF):** Used for containers, borders, and text selection, ensuring high contrast and clean visual hierarchy without relying on color clutter.

### 2. Typographic Pairings
* **Display Typography (Outfit & Arial):** Set using ultra-bold, uppercase tracking (`leading-[0.85] font-black uppercase tracking-[-0.05em]`) for display headings.
* **Display Text Stroke:** Incorporates dynamic transparent outlined letters via CSS stroke effects (e.g., *Designing The Future*) to create visual depth and a professional agency feel.
* **Editorial Block Serifs (Georgia / Serif):** Elegant serif accents used on highlighted statements (e.g., the system study statement) to create structural variety.
* **Technical Monospace (JetBrains Mono):** Applied strictly for metadata, section coordinates (e.g., `01 / PROJECTS`), confidence metrics, and data outputs to resemble real engineering monitors.

### 3. Layout Patterns & Spatial Discipline
* **Structured Negative Space:** Relies on generous cushions of space rather than dividers to create rhythm and separate distinct context groupings.
* **Brutalist Flat Containers:** All buttons, cards, input text-fields, and dropdown elements utilize solid flat geometry with sharp corners, completely removing soft rounded elements to support the Swiss aesthetic.
* **Technical Grid Overlay:** Underlying CSS grid matrices (`tech-grid-bg`) styled with very faint horizontal and vertical lines, mirroring drafting tables and blueprint grids.

### 4. Custom Architectural Components
* **Interactive Cybernetic Visor:** A responsive, fully hand-shaped SVG matte-gray helmet with radial orange gradients. It uses React physics spring values (`motion/react`) to rotate inside its 3D canvas coordinates following your cursor movements.
* **Segmented Performance Matrix:** Active projects showcase real-time interactive parameters—featuring high-speed diagnostic threshold sliders and live simulated Socket.IO payload streams.
* **Connected Cognitive Drawer:** The floating AI assistant mimics a tactical terminal console with inline suggestion selectors, a flushable memory bank, and clear telemetry system-state trackers.


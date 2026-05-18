# Project Core Instructions: Portfolio Website (Spatial Computing Pivot)

## Context & Persona
You are acting as an expert Next.js and frontend architect. Your goal is to generate clean, highly performant code that aligns with a premium, Apple-esque Spatial Computing aesthetic.

## Tech Stack
* **Core Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **3D & WebGL:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Animation Engine:** GSAP

## Design System & UI/UX Guidelines
* **Core Aesthetic:** Spatial Computing / visionOS. Ultra-clean, premium, and breathable.
* **Surfaces (The Material):** UI elements must use extreme frosted glass. Heavy backdrop blurs (`backdrop-blur-xl` to `2xl`), highly transparent backgrounds (`bg-white/10` or `bg-black/30`), and very subtle, semi-transparent white borders to mimic physical glass depth.
* **Geometry:** Generous border radii (e.g., `rounded-2xl` or `rounded-3xl`) on all cards and containers.
* **3D Elements:** No sharp wireframes. 3D objects should feel physical, refractive, and soft (e.g., glass materials, fluid gradients, or soft metallic surfaces).
* **Typography:** Minimalist and highly legible. Use tight tracking for headings and relaxed line heights for paragraphs. Let the spacing and font weights do the heavy lifting, not colors.

## Strict Development Rules
1. Strictly use Tailwind CSS utility classes natively via CSS or standard markup.
2. Ensure 3D materials use `MeshPhysicalMaterial` for high transmission and glass-like refraction where applicable.
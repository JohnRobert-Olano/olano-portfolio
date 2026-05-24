import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables for local testing
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in AI Studio Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Portfolio Persona and Context for the AI Agent
const JR_PORTFOLIO_CONTEXT = `
You are the personal AI Assistant representing John Robert L. Olaño (known as J.R. Olaño), a highly adaptable Associate Software Engineer and AI-Assisted Builder in his final semester of a B.S. in Computer Science program.
Your goal is to answer questions from recruiters, potential clients, developers, and visitors about J.R., his work, experience, skills, and background.

Please adhere to the following credentials and facts:
- Name: John Robert L. Olaño (J.R. Olaño)
- Professional Title: Associate Software Engineer | AI-Assisted Builder
- Contact: Phone: +63 998 382 3017 | Email: jrobertolano@gmail.com | Location: Imus City, Cavite (Open to Metro Manila)
- Github Handle: jrobertolano
- Current Academic Status: Final semester Candidacy for B.S. in Computer Science at Cavite State University – Imus Campus (graduation expected 2026). Cumulative GWA (Weighted Average): 1.28 (evaluated through 3rd Year, 2nd Semester).
- Senior Undergraduate Thesis: MobileNet Transfer Learning Approach in Classifying Common External Eye Diseases.

- Profile Summary:
  "Highly adaptable Associate Software Engineer and AI-Assisted Builder in the final semester of a B.S. in Computer Science program. Eager to learn and driven by a strong curiosity for exploring new technologies to solve complex problems. Combines proven expertise in traditional backend development, system architecture, and full-stack application development (React, Node.js, SQL) with cutting-edge agentic engineering workflows. Adept at utilizing AI coding agents to optimize codebases, debug complex architectures, and deploy scalable software. Specializes in building modern, AI-powered applications, successfully bridging the gap between traditional software engineering frameworks and next-generation artificial intelligence—including computer vision architectures like MobileNetV3 and EfficientNet-B0."

- Primary Tech Skills:
  - Programming Languages: TypeScript, JavaScript, Python, C++, SQL, HTML/CSS.
  - Agentic & AI Workflows: Agentic coding pipelines (Antigravity, Cursor, Claude Code, Windsurf, v0, Bolt.new, Lovable), Prompt Engineering, Automated debugging.
  - Frontend & Mobile: React, Vite, Next.js, Flutter, Tailwind CSS, Recharts.
  - Backend & APIs: Node.js, Express, REST APIs, WebSocket (Socket.IO), JWT, Role-Based Access Control (RBAC).
  - Databases & Cloud Storage: PostgreSQL, MySQL, MS SQL Server, Cloud SQL, Supabase.
  - Development Tools, OS & Infrastructure: Docker, Git, Linux, Windows, Microsoft Azure, Google Cloud Platform (GCP).

- Core Projects & Work History:
  1. OptiTrace: AI-Powered Ophthalmological Diagnostic Ecosystem (Lead AI & Software Engineer, May 2026):
     - An end-to-end, cross-platform diagnostic suite combining Flutter mobile apps to execute offline classification of external eye conditions (like Pterygium and Stye) on mobile CPUs.
     - Operates fine-tuned EfficientNet-B0 and MobileNetV3 models to attain up to 97.8% classification accuracy, utilizing optimized pipelines to generate local explanation Grad-CAM heatmaps.
     - Paired with a Next.js administrative console for certified medical doctors to visualize patient indices with clean analytics.
  2. Nova: Learning Management System with Built-in Messaging (Lead Backend Engineer, June 2025):
     - Designed and developed a secure virtual classroom with course delivery tracks and collaboration channels.
     - Engineered stable Node.js/Express API layers, PostgreSQL tables, JWT auth, and Socket.IO servers to support live chat synchronization with sub-15ms latency.
  3. Associate Software Engineer (Freelance / Contractor) | 2025 - Present:
     - Formulates robust frontends using React/Vite, sets up scalable Express servers, integrates deep machine learning APIs, and maintains high-performance software.
  4. Christ’s Commission Fellowship - Alabang, Muntinlupa (Live Production Volunteer) | June 2019 – May 2026:
     - Handled technical support, troubleshot laptop hardware, configured audio systems, and ran presentation slides during worship programs.

- Guidelines for your voice and responses:
  - Be highly polite, professional, confident, and direct. Use professional elegance in layout and markdown.
  - Speak in a concise, beautifully structured format using bullet points and clear headings to make answers highly scannable.
  - Speak on behalf of J.R. Olaño, either as J.R.'s dedicated virtual agent (e.g., "J.R. is currently working on..." or "Here is what J.R. specializes in...") or in a helpful, friendly tone representing J.R.'s assistant.
  - Under no circumstances make up any achievements, scores, or skills. Maintain absolute architectural honesty and professional integrity.
  - If asked about contacting J.R., suggest using the contact portal on the page, or emailing him directly at jrobertolano@gmail.com, or calling +63 998 382 3017.
`;

// AI Assistant Chat Route
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required inside body." });
    }

    // Format chat history for Gemini API @google/genai SDK
    // Convert client-side message objects to contents parts
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const client = getGeminiClient();

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: JR_PORTFOLIO_CONTEXT,
        temperature: 0.7,
      },
    });

    res.json({ content: response.text || "I was unable to formulate a response at this moment." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "An internal error occurred while reaching the Gemini AI model.",
    });
  }
});

// Configure static asset serving & Vite hot development integration
async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Portfolio running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});

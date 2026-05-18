export interface Project {
  id: string;
  title: string;
  role: string;
  duration: string;
  description: string;
  techStack: string[];
  highlights: string[];
  link?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    email: string;
    github: string;
    linkedin: string;
  };
  projects: Project[];
  experience: Experience[];
  skills: string[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Olano",
    title: "Software Engineer & AI Integration Specialist",
    bio: "I build high-performance, agentic-driven web applications and scalable machine learning pipelines. Passionate about 3D data visualization, clinical AI diagnostics, and modern frontend architecture.",
    email: "contact@example.com",
    github: "https://github.com/JohnRobert-Olano",
    linkedin: "https://linkedin.com/in/olano",
  },
  projects: [
    {
      id: "optitrace",
      title: "OptiTrace",
      role: "Lead Developer & ML Architect",
      duration: "2023 - Present",
      description: "A comprehensive clinical eye disease diagnostic ecosystem leveraging advanced machine learning models deployed on mobile and managed via a robust web dashboard.",
      techStack: [
        "Flutter",
        "React",
        "Firebase",
        "TensorFlow Lite",
        "Python",
        "Grad-CAM",
      ],
      highlights: [
        "Architected the OptiTrace Admin web dashboard with Firebase integration, strict role-based access control, and comprehensive analytics.",
        "Engineered the machine learning pipeline utilizing MobileNetV3, EfficientNetB0, and NASNetMobile for accurate clinical eye disease detection.",
        "Implemented TFLite conversion workflows and integrated Grad-CAM for model explainability on Flutter mobile applications.",
      ],
    },
    {
      id: "nova",
      title: "Nova",
      role: "Frontend Architect",
      duration: "2022 - 2023",
      description: "A next-generation data visualization and interactive storytelling platform emphasizing smooth user experiences and high-performance WebGL rendering.",
      techStack: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
      highlights: [
        "Built immersive 3D scrollytelling experiences using React Three Fiber and GSAP ScrollTrigger.",
        "Designed and implemented modern glassmorphism UI components to ensure an aesthetic and premium user experience.",
        "Optimized WebGL performance for seamless rendering and dynamic state management across desktop and mobile devices.",
      ],
    },
  ],
  experience: [
    {
      id: "exp1",
      company: "Independent Developer & Consultant",
      role: "Full Stack Engineer",
      duration: "2021 - Present",
      description: "Developing custom solutions in AI diagnostics, global data visualization, and immersive web experiences.",
      achievements: [
        "Spearheaded the integration of 3D globes and geospatial scrollytelling using Three.js and GSAP for interactive financial data visualization.",
        "Mentored and collaborated in agentic development workflows emphasizing strict typing and modular architecture.",
      ],
    },
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Three.js",
    "GSAP",
    "Firebase",
    "TensorFlow",
    "Flutter",
    "Python",
  ],
};

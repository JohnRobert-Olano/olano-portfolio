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

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  details: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    location?: string;
    github: string;
    linkedin: string;
  };
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: string[];
  skillsGrouped?: SkillCategory[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "John Robert L. Olaño",
    title: "ASSOCIATE SOFTWARE ENGINEER | AI-ASSISTED BUILDER",
    bio: "Highly adaptable Associate Software Engineer and AI-Assisted Builder in the final semester of a B.S. in Computer Science program. Specializes in building modern, AI-powered applications, successfully bridging the gap between traditional software engineering frameworks and next-generation artificial intelligence—including computer vision architectures like MobileNetV3 and EfficientNet-B0.",
    email: "jrobertolano@gmail.com",
    phone: "09983823017",
    location: "Imus City (Open to Metro Manila)",
    github: "https://github.com/JohnRobert-Olano",
    linkedin: "https://linkedin.com/in/olano",
  },
  projects: [
    {
      id: "nova",
      title: "Nova",
      role: "Lead Backend Engineer",
      duration: "June 2025",
      description: "A learning management system with built-in messaging featuring a secure Node.js/Express API with JWT/RBAC, PostgreSQL data architecture managing exam grading and enrollment workflows, and real-time messaging powered by WebSockets (Socket.IO).",
      techStack: [
        "React",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Socket.io",
        "JWT",
        "RBAC",
        "SQL",
        "AI Agent Prototyping",
      ],
      highlights: [
        "Designed and built a scalable LMS application powered by a secure Node.js/Express REST API, featuring strict JWT authentication and role-based access control (RBAC) to support real-world organizational learning.",
        "Built a scalable real-time messaging infrastructure utilizing Socket.IO, handling complex event states including message forwarding, reactions, soft deletes, and user notifications.",
        "Engineered a PostgreSQL database optimized for heavy read/write operations, utilizing advanced SQL functions to manage multi-step enrollment approvals and complex exam grading logic.",
        "Accelerated the development of a large-scale repository by utilizing AI tools to rapidly prototype complex React components, debug WebSocket payload inconsistencies, and streamline SQL database migrations.",
      ],
    },
    {
      id: "optitrace",
      title: "OptiTrace",
      role: "Lead AI & Software Engineer",
      duration: "May 2026",
      description: "A comprehensive clinical eye disease diagnostic ecosystem leveraging Flutter for on-device ML classification (EfficientNetB0 and MobileNetV3) at 97.8% accuracy, native Grad-CAM explainability, and a Next.js admin analytics dashboard.",
      techStack: [
        "Flutter",
        "Next.js",
        "TypeScript",
        "Python",
        "EfficientNetB0",
        "MobileNetV3",
        "Grad-CAM",
        "Recharts",
        "Firebase",
        "Gemini AI",
      ],
      highlights: [
        "Engineered a Flutter application for on-device eye disease classification (including Pterygium and Stye), achieving up to 97.8% accuracy utilizing fine-tuned EfficientNetB0 and MobileNetV3 architectures to facilitate accessible remote screening for patients.",
        "Developed a custom dual-output architecture to bypass mobile tensor limitations, successfully rendering native Explainable AI (Grad-CAM) heatmaps directly on mobile CPUs for real-time diagnostic transparency.",
        "Architected a secure Next.js and TypeScript admin dashboard, engineering a real-time data analytics engine using Recharts to turn screening data into actionable insights that drive smarter clinical decisions.",
        "Leveraged AI coding agents to accelerate development across the Python ML pipeline, Dart frontend, and React backend, rapidly deploying complex features like serverless API routes and automated Nodemailer email systems.",
        "Designed the end-to-end ecosystem to democratize eye care, providing patients with rapid, offline screening tools while equipping verified doctors with a secure platform to validate diagnoses and manage patient registries.",
      ],
    },
  ],
  experience: [
    {
      id: "ccf",
      company: "Christ’s Commission Fellowship Alabang",
      role: "Live Prod Volunteer",
      duration: "June 2019 – May 2026",
      description: "Assisted with technical support and visual systems, managing live audio systems and hardware troubleshooting for worship services and performances.",
      achievements: [
        "Assisted with technical support for teachers and staff by troubleshooting laptops and devices before and during services.",
        "Managed live audio systems for worship and performances, ensuring high-quality sound delivery throughout events.",
        "Created and operated visual presentation slides, enhancing the visual experience of worship sessions and stage performances.",
      ],
    },
  ],
  education: [
    {
      id: "cvsu",
      institution: "Cavite State University – Imus Campus",
      degree: "B.S. in Computer Science",
      duration: "Expected Graduation: 2026",
      details: [
        "GWA: 1.28 – 3rd Year, 2nd Semester",
        "Senior Thesis: MobileNet Transfer Learning Approach in Classifying Common External Eye Diseases",
        "Relevant Courses: Data Structures & Algorithms, Programming Languages, Discrete Mathematics, Web Development, Software Testing & Quality Assurance, Game Development, Linear Algebra, Probability & Statistics",
      ],
    },
  ],
  skills: [
    "TypeScript", "JavaScript", "Python", "Dart", "Java", "C++", "SQL",
    "Cursor", "Claude Code", "Google Antigravity", "Computer Vision", "Transfer Learning", "Explainable AI (Grad-CAM)", "MobileNetV3", "EfficientNetB0", "Gemini AI",
    "React.js", "Next.js", "Flutter", "Tailwind CSS", "HTML/CSS",
    "Git", "Power BI", "Windows Troubleshooting", "Basic Network Setup", "System Maintenance",
    "Node.js", "Express.js", "RESTful APIs", "WebSockets (Socket.io)", "JWT Authentication",
    "PostgreSQL", "Firebase (Firestore, Auth, Storage)", "SQLite",
    "Multer", "MVC Architecture", "Role-Based Access Control (RBAC)", "System Migration",
    "Problem-Solving under Pressure", "Agile Adaptability", "Cross-functional Leadership", "Technical Debugging"
  ],
  skillsGrouped: [
    {
      category: "Programming Languages",
      items: ["TypeScript", "JavaScript", "Python", "Dart", "Java", "C++", "SQL"]
    },
    {
      category: "AI & Agentic Engineering",
      items: ["Cursor", "Claude Code", "Google Antigravity", "Computer Vision", "Transfer Learning", "Explainable AI (Grad-CAM)", "MobileNetV3", "EfficientNetB0", "Gemini AI"]
    },
    {
      category: "Frontend & Mobile",
      items: ["React.js", "Next.js", "Flutter", "Tailwind CSS", "HTML/CSS"]
    },
    {
      category: "Backend & APIs",
      items: ["Node.js", "Express.js", "RESTful APIs", "WebSockets (Socket.io)", "JWT Authentication"]
    },
    {
      category: "Databases & Cloud",
      items: ["PostgreSQL", "Firebase (Firestore, Auth, Storage)", "SQLite"]
    },
    {
      category: "IT & Support Tools",
      items: ["Git", "Power BI (Data Analysis, Report Automation)", "Windows Troubleshooting", "Basic Network Setup", "System Maintenance"]
    },
    {
      category: "Tools & Architecture",
      items: ["Multer", "MVC Architecture", "Role-Based Access Control (RBAC)", "System Migration"]
    },
    {
      category: "Soft Skills",
      items: ["Problem-Solving under Pressure", "Agile Adaptability", "Cross-functional Leadership", "Technical Debugging"]
    }
  ]
};

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

export interface ExperienceNode {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  duration: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

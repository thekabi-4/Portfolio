export interface Project {
  id: number;
  title: string;
  technologies: string[];
  description: string;
  details: string[];
  category: "Featured" | "Other";
  link?: string;
  github?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

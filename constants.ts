import { Project, Experience, Skill, Certification, Education } from "./types";
import {
  Brain,
  Database,
  Cpu,
  Code,
  Globe,
  Server,
  Terminal,
  Layers,
} from "lucide-react";

export const PERSONAL_INFO = {
  name: "Kabilesh Naveenkumar",
  tagline:
    "AI/ML Engineer • Deep-Tech Innovator • Founder – Rehabionics Healthcare Pvt. Ltd.",
  roles: ["AI/ML Engineer", "Deep-Tech Innovator", "Founder"],
  location: "Coimbatore, Tamil Nadu, India",
  email: "the.kabi2004@gmail.com",
  phone: "+91 93855 85574",
  linkedin: "https://www.linkedin.com/in/kabilesh-naveenkumar",
  github: "https://github.com/thekabi-4",
  address:
    "55, Sadayappa Gounder Street, Rathinapuri, Coimbatore, Tamilnadu - 641027",
  about: `Deep-tech engineer specializing in Artificial Intelligence, Machine Learning, Generative AI, Retrieval-Augmented Generation (RAG), and Intelligent System Design. Experienced in building AI-powered solutions across healthcare, education, smart cities, and public safety, integrating end-to-end pipelines from data ingestion to deployment.

  As Founder of Rehabionics, I lead R&D of next-generation EMG/EMS physiotherapy devices with AI-powered signal processing, real-time analytics, and BLE IoT integration.

  I design scalable AI systems including offline RAG architectures, CV-based surveillance, autonomous robotics, low-resource LLM inference, semantic search engines, and real-world embedded platforms. I focus on developing impact-driven, production-grade AI systems that combine intelligence, engineering, and purpose.`,
};

export const WHAT_I_DO = [
  {
    title: "Medical IoT Systems",
    description:
      "Design and integrate AI-driven hardware–software systems for clinical-grade medical IoT devices.",
  },
  {
    title: "Intelligent AI Solutions",
    description:
      "Build intelligent AI solutions for public health, smart mobility, and urban safety using CV, ML, and edge computing.",
  },
  {
    title: "Embedded Platforms",
    description:
      "Prototype, test, and deploy embedded platforms that operate reliably in real-world environments.",
  },
  {
    title: "Scalable Pipelines",
    description:
      "Develop scalable pipelines for data ingestion, ML inference, RAG processing, and automated actuation.",
  },
  {
    title: "Modular Architectures",
    description:
      "Engineer modular, production-ready architectures combining AI models, embedded systems, and cloud/on-device intelligence.",
  },
];

export const SKILLS: Skill[] = [
  {
    category: "AI/ML & Generative AI",
    items: [
      "LLMs",
      "RAG Systems",
      "Transformers",
      "PEFT/LoRA",
      "Model Optimisation",
      "Fine-Tuning",
      "Hugging Face",
      "Vector DB",
      "Chroma DB",
      "Knowledge Graph",
      "Generative AI",
      "Deep Learning",
      "Classical ML",
      "Prompt Engineering",
      "FAISS",
      "llama.cpp",
      "State Space Models",
    ],
  },
  {
    category: "NLP & Retrieval",
    items: [
      "TF-IDF",
      "Word Embeddings",
      "Language Modelling",
      "Text Classification",
      "Pre-processing",
      "SymSpell",
      "LanguageTool",
    ],
  },
  {
    category: "Computer Vision",
    items: [
      "YOLOv8",
      "OpenCV",
      "DeepSORT",
      "OCR",
      "Real-Time Video Analytics",
      "Image Processing",
      "Detection Pipelines",
    ],
  },
  {
    category: "Programming",
    items: [
      "Python",
      "Flask",
      "Streamlit",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Plotly",
      "SQL",
      "JavaScript",
    ],
  },
  {
    category: "Data Science Tools",
    items: [
      "Data Analysis",
      "Visualization",
      "Statistical Modelling",
      "Jupyter Notebook",
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Director",
    company: "Rehabionics Healthcare Pvt. Ltd.",
    period: "March 2024 – Present",
    location: "Coimbatore",
    description: [
      "Leading R&D for clinically reliable EMG/EMS physiotherapy and rehabilitation devices.",
      "Architecting end-to-end AI-driven hardware–software systems involving real-time signal processing, embedded platforms, and mobile integration.",
      "Overseeing hardware, firmware, ML, and app development teams, ensuring alignment with medical standards and product strategy.",
      "Driving investor communication, partnership development, and patent-focused innovation.",
    ],
  },
  {
    id: 2,
    role: "Data Science Mentor",
    company: "Chronosphere",
    period: "July 2025 – Present",
    location: "Madhya Pradesh",
    description: [
      "Guide engineering teams on data science projects, courses and observability workflows.",
      "Conduct code reviews, architecture assessments, and debugging of distributed systems.",
      "Deliver technical training and learning materials for internal engineering cohorts.",
    ],
  },
  {
    id: 3,
    role: "Event Lead & Point of Contact",
    company: "Macro Vision Academy",
    period: "2024",
    location: "World Book of Records Event",
    description: [
      "Coordinated end-to-end execution of a large-scale coding world-record attempt.",
      "Managed communication with World Book of Records, London, including verification, documentation, media proof, and final submission.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Offline RAG Pipeline",
    category: "Featured",
    technologies: ["Qwen3-4B", "LoRA", "FAISS", "Flask", "SymSpell"],
    description: "Production-grade offline RAG system optimized for 8 GB GPUs.",
    details: [
      "Integrated Qwen3-4B in 4-bit precision with custom LoRA adapters (trained via Unsloth).",
      "Implemented semantic retrieval using FAISS and automated grammar/spell correction.",
      "Built Flask APIs with CORS, health checks, and streaming responses.",
      "Designed for complete offline execution with no external API dependencies.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 2,
    title: "Real-Time Accident Detection",
    category: "Featured",
    technologies: ["YOLOv8", "DeepSORT", "OpenCV", "TensorFlow", "OCR"],
    description:
      "Computer vision system detecting accidents in real time from CCTV feeds.",
    details: [
      "Handled multi-camera grid, crash detection, vehicle tracking, and number plate recognition.",
      "Logged incidents for emergency response and reporting.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 3,
    title: "Drone-Disinfectant System",
    category: "Featured",
    technologies: ["YOLOv8", "Roboflow", "OpenCV", "JS", "HTML/CSS"],
    description:
      "AI-powered drone automation system for targeted disinfectant spraying.",
    details: [
      "Trained a custom YOLOv8 model using Roboflow for high-accuracy surface and pothole detection.",
      "Implemented autonomous spray activation logic based on real-time detection confidence scores.",
      "Integrated front-end visualization for drone path, detection zones, and spray coverage.",
      "Engineered as a prototype for automated mosquito-control and sanitation operations.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 4,
    title: "Academic Performance Analyzer",
    category: "Featured",
    technologies: ["Python", "Streamlit", "scikit-learn", "MySQL"],
    description:
      "Automated 10th, 11th and 12th-grade marksheet analysis with error correction and clustering.",
    details: [
      "Delivered correlation insights, outlier detection, subject analytics, and dashboards for teachers.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 5,
    title: "Small Language Model RAG",
    category: "Featured",
    technologies: ["TinyLlama", "FAISS", "llama.cpp"],
    description:
      "Lightweight RAG framework optimized for low-resource devices.",
    details: [
      "Performed semantic search, answer formatting, and grammar correction.",
      "Integrated GGUF TinyLlama models via llama.cpp.",
      "Generated structured curriculum-aligned educational responses.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 6,
    title: "Binit – Waste Segregation",
    category: "Other",
    technologies: ["TensorFlow.js", "Web ML"],
    description:
      "TensorFlow.js-based browser ML model performing real-time waste classification via webcam.",
    details: ["Demonstrated lightweight, front-end-only ML deployment."],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 7,
    title: "All Is Well Hospital Automation",
    category: "Other",
    technologies: ["Python", "Streamlit", "SQLite"],
    description:
      "Automated attendance sheet processing, HR validation rules, and payroll-ready reporting.",
    details: [
      "Generated monthly summaries and payroll-ready reports for finance teams.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 8,
    title: "Natural Language Detection",
    category: "Other",
    technologies: ["TF-IDF", "Classical ML"],
    description:
      "TF-IDF + classical ML classifiers for multilingual language identification.",
    details: ["Supported multilingual datasets with evaluation metrics."],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Academy Graduate – Machine Learning Foundations",
    issuer: "AWS",
    date: "2025",
  },
  { name: "Prompt Engineering Certifications", issuer: "AWS", date: "2025" },
  { name: "AI for All", issuer: "NVIDIA", date: "2024" },
  {
    name: "Improving Real-World RAG Systems",
    issuer: "Analytics Vidhya",
    date: "2025",
  },
  {
    name: "Introduction to Generative AI",
    issuer: "Google Cloud",
    date: "2025",
  },
  {
    name: "Introduction to Large Language Models",
    issuer: "Google Cloud",
    date: "2025",
  },
  { name: "Python (Basic)", issuer: "HackerRank", date: "2024" },
  { name: "SQL (Basic)", issuer: "HackerRank", date: "2024" },
  {
    name: "Introduction to Agile Methodology",
    issuer: "Infosys Springboard",
    date: "October 2025",
  },
  {
    name: "Continuous Integration and Delivery (CI/CD)",
    issuer: "Infosys Springboard",
    date: "October 2025",
  },
  {
    name: "Microsoft Office Essentials",
    issuer: "Naan Mudhalvan",
    date: "2024",
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "B.Tech – Artificial Intelligence & Data Science",
    institution:
      "Suguna College of Engineering (Affiliated to Anna University)",
    year: "2022 – 2026",
  },
  {
    degree: "Senior Secondary – Computer Science",
    institution: "Suguna PIPS (Affiliated to CBSE)",
    year: "2020 – 2022",
  },
  {
    degree: "Secondary Schooling – Computer Science",
    institution: "Amrita Vidhyalayam (Affiliated to CBSE)",
    year: "2020",
  },
];

export const ACHIEVEMENTS = [
  {
    title: "Event Lead & POC – Macro Vision Academy",
    description:
      "Led execution of a large-scale coding world-record attempt; coordinated logistics, documentation, verification, and final submission with World Book of Records, London.",
    highlight: "World Book of Records Event, 2024",
  },
  {
    title: "Seed Funding Raised",
    description:
      "Successfully pitched and raised ₹1 Lakh seed funding for medical IoT innovation.",
    highlight: "Rehabionics Healthcare Pvt. Ltd.",
  },
  {
    title: "24-Hour Non-Stop Programming Codeathon",
    description: "Group World Record organizer and participant.",
    highlight: "Kalam’s World Records, 2024",
  },
  {
    title: "Treasurer and AWS Instructor",
    description: "Consecutive Two Time Treasurer and AWS Instructor.",
    highlight: "Suguna College of Engineering",
  },
];

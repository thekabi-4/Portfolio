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
    "Training Machines. Mentoring People. Building the Future.\nAI/ML | Data Science | Innovation Enthusiast",
  roles: ["AI/ML Engineer", "Data Scientist", "Innovator", "R&D Lead"],
  location: "Coimbatore, Tamil Nadu, India",
  email: "the.kabi2004@gmail.com",
  phone: "9385585574",
  linkedin: "https://www.linkedin.com/in/kabilesh-naveenkumar",
  github: "https://github.com/thekabi-4",
  address:
    "55, Sadayappa Gounder Street, Rathinapuri, Coimbatore, Tamilnadu - 641027",
  about: `Deep-tech engineer specializing in Artificial Intelligence, Machine Learning, Generative AI, Retrieval-Augmented Generation (RAG), and Intelligent System Design. Experienced in building AI-powered solutions across healthcare, education, smart cities, and public safety, integrating end-to-end pipelines from data ingestion to deployment.

  As Founder of Rehabionics, I lead R&D of next-generation EMG/EMS physiotherapy devices with AI-powered signal processing, real-time analytics, and BLE IoT integration.

  I design scalable AI systems including offline RAG architectures, CV-based surveillance, autonomous robotics, low-resource LLM inference, semantic search engines, and real-world embedded platforms.

  Driven by innovation and purpose, I build technologies that combine AI intelligence + robust engineering to create impact-oriented, scalable, and future-ready solutions.`,
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
      "LLMs (Qwen, TinyLlama)",
      "RAG Systems",
      "PEFT/LoRA/Unsloth",
      "Quantization (GGUF)",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Graph Reasoning",
    ],
  },
  {
    category: "NLP & Retrieval",
    items: [
      "LangChain",
      "FAISS",
      "ChromaDB",
      "Embeddings",
      "TF-IDF",
      "SymSpell",
      "LanguageTool",
    ],
  },
  {
    category: "Computer Vision",
    items: [
      "YOLOv8",
      "DeepSORT",
      "OpenCV",
      "Roboflow",
      "OCR",
      "Real-time Tracking",
    ],
  },
  {
    category: "Programming & Frameworks",
    items: [
      "Python",
      "JavaScript",
      "SQL",
      "Flask",
      "Streamlit",
      "FastAPI",
      "llama.cpp",
      "Hugging Face",
    ],
  },
  {
    category: "Data & Visualization",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Data Cleaning",
      "Feature Engineering",
    ],
  },
  {
    category: "Tools & Design",
    items: [
      "Git",
      "Linux",
      "VS Code",
      "PyInstaller",
      "UI/UX Fundamentals",
      "System Architecture",
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
      "Lead R&D for affordable, clinically reliable physiotherapy and rehabilitation devices.",
      "Architect EMG/EMS IoT systems with real-time signal acquisition and therapy modes.",
      "Direct hardware, firmware, ML, and mobile development teams.",
      "Ensure compliance with medical standards (IEC 60601-1).",
      "Manage investor relations, partnerships, and product strategy.",
      "Developed patentable architectures and circuits.",
    ],
  },
  {
    id: 2,
    role: "Technical Mentor",
    company: "Chronosphere",
    period: "July 2025 – Present",
    location: "Madhya Pradesh",
    description: [
      "Mentored teams on scalable cloud-native systems and observability best practices.",
      "Conducted architecture reviews, code audits, and pair programming.",
      "Created internal documentation and training material for new engineers.",
      "Assisted in debugging large-scale distributed systems.",
    ],
  },
  {
    id: 3,
    role: "Event Lead & POC",
    company: "Macro Vision Academy",
    period: "2024",
    location: "Remote/On-site",
    description: [
      "Led organization of a large-scale coding world record event.",
      "Acted as the primary point of contact with World Book of Records, London.",
      "Coordinated communication, verification, documentation, and submission processes.",
      "Managed event logistics, media proof preparation, and final certification workflow.",
    ],
  },
  {
    id: 4,
    role: "Basketball Coach",
    company: "Suguna PIP School",
    period: "April 2022 – December 2024",
    location: "Coimbatore",
    description: [
      "Trained student teams, managed coaching schedules, and facilitated tournaments.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Offline RAG Pipeline",
    category: "Featured",
    technologies: ["Qwen3-4B", "LoRA", "FAISS", "Flask", "Unsloth"],
    description:
      "A production-grade offline Retrieval-Augmented Generation system optimized for 8 GB GPUs.",
    details: [
      "Integrated Qwen3-4B in 4-bit precision with custom LoRA adapters trained using Unsloth.",
      "Implemented semantic retrieval using FAISS for large educational datasets.",
      "Added automated query correction, grammar refinement, and context-aware generation.",
      "Provided Flask API endpoints with health checks, CORS, and streaming responses.",
      "Designed for complete offline execution without external API dependency.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 2,
    title: "Small Language Model RAG",
    category: "Featured",
    technologies: ["TinyLlama", "llama.cpp", "FAISS", "Colab"],
    description:
      "Lightweight RAG pipeline for educational Q&A, optimized for low-resource environments.",
    details: [
      "Performed semantic search, answer-type classification, and grammar correction.",
      "Generated structured responses based on educational marking schemes.",
      "Built for seamless execution in Google Colab with minimal hardware requirements.",
      "Utilized TinyLlama GGUF models via llama.cpp for efficient inference.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 3,
    title: "Real-Time Accident Detection",
    category: "Featured",
    technologies: ["YOLOv8", "DeepSORT", "OpenCV", "TensorFlow", "Flask"],
    description:
      "AI-powered traffic surveillance system detecting accidents in real time.",
    details: [
      "Streamed multiple CCTV feeds in a unified monitoring grid.",
      "Performed accident detection, vehicle tracking, and license plate recognition (OCR).",
      "Logged incidents with metadata for emergency response and reporting.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 4,
    title: "Drone-Disinfectant System",
    category: "Featured",
    technologies: ["YOLOv8", "Roboflow", "OpenCV", "JS", "HTML/CSS"],
    description:
      "AI-powered drone automation system for detecting potholes and mosquito-prone zones.",
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
    id: 5,
    title: "MVA Academic Analyzer",
    category: "Featured",
    technologies: ["Python", "Streamlit", "scikit-learn", "MySQL"],
    description:
      "End-to-end academic analytics platform for 10th-grade marksheet processing.",
    details: [
      "Automated Excel parsing, validation, and data cleaning for inconsistent datasets.",
      "Provided clustering, outlier detection, correlation insights, and subject performance metrics.",
      "Delivered actionable insights for educators through an interactive Streamlit dashboard.",
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
      "Client-side waste classification system executed entirely within the browser.",
    details: [
      "Loaded ML models using model.json and weights.bin.",
      "Performed real-time waste classification through webcam and image input.",
      "Demonstrated lightweight, front-end-only ML deployment.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 7,
    title: "All Is Well Hospital Automation",
    category: "Other",
    technologies: ["Python", "Streamlit", "SQLite"],
    description:
      "Attendance and payroll processing system deployed for a hospital and clinic chain.",
    details: [
      "Parsed Excel attendance sheets and validated daily logs.",
      "Implemented complex HR policies including weekly offs, CL allocation, and consultant rules.",
      "Generated monthly summaries and payroll-ready reports for finance teams.",
    ],
    link: "#",
    github: "https://github.com/thekabi-4",
  },
  {
    id: 8,
    title: "Natural Language Detection",
    category: "Other",
    technologies: ["scikit-learn", "TF-IDF", "NLTK"],
    description: "ML model for detecting the language of input text.",
    details: [
      "Implemented preprocessing, TF-IDF vectorization, and classical ML classifiers.",
      "Included a Streamlit interface and Jupyter Notebook for experimentation.",
      "Supported multilingual datasets with evaluation metrics.",
    ],
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
  { name: "Foundations of Prompt Engineering", issuer: "AWS", date: "2025" },
  { name: "Essentials of Prompt Engineering", issuer: "AWS", date: "2025" },
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
    name: "Microsoft Office Essentials",
    issuer: "Naan Mudhalvan",
    date: "2024",
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "B.Tech – Artificial Intelligence & Data Science",
    institution: "Suguna College of Engineering",
    year: "2022 – 2026",
  },
  {
    degree: "Senior Secondary – Computer Science",
    institution: "Suguna PIP",
    year: "2020 – 2022",
  },
];

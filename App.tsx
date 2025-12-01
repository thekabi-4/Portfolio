import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Scene3D from "./components/Scene3D";
import CustomCursor from "./components/CustomCursor";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";
import Chatbot from "./components/Chatbot";
import Modal from "./components/Modal";
import Terminal from "./components/Terminal";
import CoreModules from "./components/CoreModules";
import SkillNetwork from "./components/SkillNetwork";
import ValidationStack from "./components/ValidationStack";
import ModularFooter from "./components/ModularFooter";
import {
  PERSONAL_INFO,
  WHAT_I_DO,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  CERTIFICATIONS,
  EDUCATION,
  ACHIEVEMENTS,
} from "./constants";
import {
  Brain,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  Building,
  Award,
  GraduationCap,
  Cpu,
  Database,
  Code,
  Eye,
  MessageSquare,
  Wrench,
  BarChart,
} from "lucide-react";
import { Project } from "./types";

const getCategoryIcon = (category: string) => {
  if (category.includes("AI/ML"))
    return <Brain className="w-5 h-5 text-cyan-500" />;
  if (category.includes("NLP"))
    return <MessageSquare className="w-5 h-5 text-cyan-500" />;
  if (category.includes("Vision"))
    return <Eye className="w-5 h-5 text-cyan-500" />;
  if (category.includes("Programming"))
    return <Code className="w-5 h-5 text-cyan-500" />;
  if (category.includes("Data"))
    return <Database className="w-5 h-5 text-cyan-500" />;
  if (category.includes("Tools"))
    return <Wrench className="w-5 h-5 text-cyan-500" />;
  return <Cpu className="w-5 h-5 text-cyan-500" />;
};

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 cursor-none">
      <CustomCursor />
      <Scene3D />
      <Navbar />

      <main className="relative">
        {/* Global Background Gradients */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(15,23,42,1))]" />
          <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-violet-900/10 rounded-full blur-3xl" />
        </div>
        <Hero />

        {/* About Section */}
        <Section id="about" title="System Kernel">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <Terminal />

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="block text-3xl font-bold text-cyan-400">
                    6 Mo+
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    Runtime
                  </span>
                </div>
                <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="block text-3xl font-bold text-violet-400">
                    10+
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    Modules
                  </span>
                </div>
                <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="block text-3xl font-bold text-cyan-400">
                    1L+
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    Resources
                  </span>
                </div>
                <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="block text-3xl font-bold text-violet-400">
                    2
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    Benchmarks
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Education Card */}
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="text-cyan-400" /> Knowledge Base
                </h3>
                <div className="space-y-4">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-slate-700 pl-4">
                      <h4 className="font-semibold text-gray-200">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-cyan-400">{edu.institution}</p>
                      <p className="text-xs text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">
                  Communication Protocols
                </h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-500" />{" "}
                    {PERSONAL_INFO.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-500" />{" "}
                    {PERSONAL_INFO.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-500" />{" "}
                    {PERSONAL_INFO.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* What I Do Section */}
        <Section
          id="what-i-do"
          title="Core Modules"
          subtitle="Bridging Intelligence and Engineering"
          className="bg-slate-900/30"
        >
          <CoreModules />
        </Section>

        {/* Skills Section */}
        <Section
          id="skills"
          title="Neural Capabilities"
          subtitle="Knowledge Graph & Technical Primitives"
        >
          <div className="hidden md:block">
            <SkillNetwork />
          </div>
          <div className="md:hidden grid gap-6">
            {SKILLS.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50"
              >
                <h3 className="text-xl font-mono text-cyan-200 mb-4">
                  <span className="text-cyan-500">&gt;</span>{" "}
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-slate-800/80 text-cyan-100/80 rounded text-xs font-mono border border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <Section
          id="projects"
          title="Deployed Models"
          subtitle="Inference Engines & Real-world Applications"
          className="bg-slate-900/30"
        >
          <h3 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-violet-500 font-mono">
            // Featured_Deployments
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {PROJECTS.filter((p) => p.category === "Featured").map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              )
            )}
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-cyan-500 font-mono">
            // Experimental_Prototypes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.filter((p) => p.category === "Other").map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </Section>

        {/* Experience Section */}
        <Section
          id="experience"
          title="Training Epochs"
          subtitle="Model Evolution & Parameter Tuning"
        >
          <div className="space-y-8 relative border-l border-slate-800 ml-3 md:ml-6">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Node */}
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-cyan-500 rounded-full ring-4 ring-slate-900" />

                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 hover:border-cyan-500/30 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 font-mono text-sm">
                    <div className="text-cyan-400">
                      <span className="text-gray-500">
                        Epoch {EXPERIENCE.length - idx} //{" "}
                      </span>
                      {exp.period}
                    </div>
                    <div className="text-gray-500">
                      Loss:{" "}
                      <span className="text-green-400">
                        {(0.1 * (idx + 1)).toFixed(4)}
                      </span>{" "}
                      • Acc:{" "}
                      <span className="text-green-400">
                        {(0.9 + 0.01 * (EXPERIENCE.length - idx)).toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-violet-400 mb-4 font-mono text-sm">
                    @{exp.company}
                  </div>

                  <div className="space-y-2">
                    {exp.description.map((item, i) => (
                      <div key={i} className="flex gap-3 text-gray-400 text-sm">
                        <span className="text-cyan-500/50 font-mono shrink-0">
                          [{i}]
                        </span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Certifications & Achievements Section */}
        <Section id="certifications" title="Validation Metrics">
          <ValidationStack />
        </Section>

        {/* Contact Footer */}
        <ModularFooter />

        {/* Chatbot Overlay */}
        <Chatbot />

        {/* Project Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      </main>
    </div>
  );
};

export default App;

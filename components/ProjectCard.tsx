import React, { useRef } from "react";
import { Project } from "../types";
import { Cpu } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const isFeatured = project.category === "Featured";
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, (value) => value / 20);
  const rotateY = useTransform(mouseX, (value) => value / -20);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer ${
        isFeatured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 relative z-10 h-full flex flex-col transform-gpu translate-z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-black/60 rounded-lg border border-white/10 group-hover:border-cyan-500/30 transition-colors shadow-lg shadow-cyan-900/20">
            <Cpu className="w-6 h-6 text-cyan-400" />
          </div>
          {isFeatured && (
            <span className="px-3 py-1 text-xs font-semibold bg-violet-900/50 text-violet-300 border border-violet-700/50 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.3)]">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {project.description}
        </p>

        <div className="mb-4">
          <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside">
            {project.details.slice(0, 2).map((detail, idx) => (
              <li key={idx} className="truncate">
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium bg-black/60 text-cyan-200 rounded border border-white/10 hover:border-cyan-500/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

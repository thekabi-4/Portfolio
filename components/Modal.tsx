import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Cpu } from "lucide-react";
import { Project } from "../types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-500/20 relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>

              <div className="relative h-48 bg-gradient-to-br from-cyan-900/40 to-violet-900/40 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-24 h-24 text-cyan-500/20" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900 to-transparent">
                  <h2 className="text-3xl font-bold text-white">
                    {project.title}
                  </h2>
                  <span className="text-cyan-400 text-sm font-mono">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.description}
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-400"
                      >
                        <span className="text-cyan-500 mt-1.5">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800 text-cyan-200 rounded-lg border border-slate-700 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-800">
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  )}
                  <a
                    href="#"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors border border-slate-700"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

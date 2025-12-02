import React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Layers, Server, Terminal } from "lucide-react";

interface HolographicCardProps {
  title: string;
  description: string;
  index: number;
  className?: string;
}

const HolographicCard: React.FC<HolographicCardProps> = ({
  title,
  description,
  index,
  className = "",
}) => {
  const getIcon = (title: string) => {
    if (title.includes("IoT")) return <Cpu className="w-8 h-8" />;
    if (title.includes("AI")) return <BrainIcon className="w-8 h-8" />;
    if (title.includes("Embedded")) return <Layers className="w-8 h-8" />;
    if (title.includes("Scalable")) return <Server className="w-8 h-8" />;
    if (title.includes("Modular")) return <Terminal className="w-8 h-8" />;
    return <Globe className="w-8 h-8" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative group ${className}`}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl opacity-20 group-hover:opacity-100 transition duration-500 blur" />
      <div className="relative h-full bg-black/90 backdrop-blur-xl p-8 rounded-xl border border-white/10 overflow-hidden">
        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] transform -translate-y-full group-hover:translate-y-[300px] transition-transform duration-1000 ease-in-out" />

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="mb-6 p-4 bg-black/50 rounded-lg w-fit border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-900/20 transition-all duration-300">
            <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
              {getIcon(title)}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
            {title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </div>
      </div>
    </motion.div>
  );
};

// Custom Brain Icon since it's not exported from lucide-react in the same way sometimes or just to be safe
const BrainIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

export default HolographicCard;

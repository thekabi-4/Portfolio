import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Globe,
  Layers,
  Server,
  Terminal,
  Brain,
  Activity,
  Database,
  Box,
  Zap,
  ChevronRight,
} from "lucide-react";
import { WHAT_I_DO } from "../constants";

const CoreModules = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const getIcon = (title: string) => {
    if (title.includes("IoT")) return <Activity className="w-6 h-6" />;
    if (title.includes("AI")) return <Brain className="w-6 h-6" />;
    if (title.includes("Embedded")) return <Cpu className="w-6 h-6" />;
    if (title.includes("Scalable")) return <Database className="w-6 h-6" />;
    if (title.includes("Modular")) return <Box className="w-6 h-6" />;
    return <Globe className="w-6 h-6" />;
  };

  const getColor = (index: number) => {
    const colors = [
      "from-cyan-500/20 to-blue-500/20",
      "from-violet-500/20 to-purple-500/20",
      "from-emerald-500/20 to-teal-500/20",
      "from-orange-500/20 to-red-500/20",
      "from-pink-500/20 to-rose-500/20",
    ];
    return colors[index % colors.length];
  };

  const getBorderColor = (index: number) => {
    const colors = [
      "group-hover:border-cyan-500/50",
      "group-hover:border-violet-500/50",
      "group-hover:border-emerald-500/50",
      "group-hover:border-orange-500/50",
      "group-hover:border-pink-500/50",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full h-[600px] md:h-[500px] flex flex-col md:flex-row gap-4">
      {WHAT_I_DO.map((item, idx) => {
        const isActive = activeIndex === idx;
        return (
          <motion.div
            key={idx}
            layout
            onClick={() => setActiveIndex(idx)}
            onMouseEnter={() => setActiveIndex(idx)}
            className={`
              relative group cursor-pointer overflow-hidden rounded-2xl 
              border border-slate-800/60 bg-slate-950/40 backdrop-blur-sm
              transition-colors duration-500
              ${getBorderColor(idx)}
              ${
                isActive
                  ? "flex-[3] border-slate-700"
                  : "flex-[1] border-slate-800/60"
              }
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Background Gradient & Pattern */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getColor(
                idx
              )} opacity-0 ${
                isActive ? "opacity-100" : "group-hover:opacity-30"
              } transition-opacity duration-500`}
            />

            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Content Container */}
            <div className="relative h-full flex flex-col p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`
                  p-3 rounded-xl bg-slate-900/80 border border-slate-800 
                  ${isActive ? "text-white border-slate-600" : "text-slate-400"}
                  transition-all duration-300
                `}
                >
                  {getIcon(item.title)}
                </div>

                {/* Active Indicator */}
                <motion.div
                  animate={{ rotate: isActive ? 90 : 0 }}
                  className={`text-slate-500 ${
                    isActive ? "text-cyan-400" : ""
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Title - Rotated when inactive on desktop */}
              <div className="flex-1 flex flex-col justify-end md:justify-start">
                <motion.h3
                  layout="position"
                  className={`
                      text-lg font-bold font-mono uppercase tracking-wider whitespace-nowrap
                      ${isActive ? "text-white mb-4" : "text-slate-400"}
                    `}
                  animate={{
                    rotate: isActive ? 0 : -90,
                    originX: 0,
                    originY: 1,
                    position: isActive ? "relative" : "absolute",
                    bottom: isActive ? "auto" : 32, // 2rem = 32px
                    left: isActive ? "auto" : 32,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {item.title}
                </motion.h3>

                {/* Description - Only visible when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                        {item.description}
                      </p>

                      {/* Decorative Tech Elements */}
                      <div className="mt-6 flex items-center gap-2 text-xs font-mono text-cyan-500/60">
                        <Zap className="w-3 h-3" />
                        <span>SYSTEM_ACTIVE</span>
                        <div className="h-px w-12 bg-cyan-500/20" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CoreModules;

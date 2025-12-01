import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Shield,
  Award,
  ChevronRight,
  Database,
  Cpu,
  Layers,
  RotateCw,
} from "lucide-react";
import { CERTIFICATIONS, ACHIEVEMENTS } from "../constants";

type Category = "clearance" | "milestones";

const ValidationStack = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("clearance");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const data = activeCategory === "clearance" ? CERTIFICATIONS : ACHIEVEMENTS;

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll to index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = latest * (data.length - 1);
    const newIndex = Math.round(rawIndex);

    if (newIndex !== activeIndex) {
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    }
  });

  // Reset index when category changes
  React.useEffect(() => {
    setActiveIndex(0);
    setDirection(0);
  }, [activeCategory]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${data.length * 50}vh` }} // Dynamic height based on items
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Category Toggle */}
        <div className="absolute top-24 z-50 flex gap-2 p-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 shadow-lg">
          <button
            onClick={() => setActiveCategory("clearance")}
            className={`px-6 py-2 rounded-full text-xs font-bold font-mono transition-all ${
              activeCategory === "clearance"
                ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            CLEARANCE
          </button>
          <button
            onClick={() => setActiveCategory("milestones")}
            className={`px-6 py-2 rounded-full text-xs font-bold font-mono transition-all ${
              activeCategory === "milestones"
                ? "bg-violet-500 text-slate-950 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            MILESTONES
          </button>
        </div>

        {/* 3D Stack Container */}
        <div className="relative w-full max-w-md h-[350px] mt-12 perspective-1000">
          <AnimatePresence mode="popLayout" custom={direction}>
            {data.map((item, index) => {
              if (index !== activeIndex) return null;

              const isClearance = activeCategory === "clearance";
              const themeColor = isClearance ? "cyan" : "violet";
              const ThemeIcon = isClearance ? Shield : Award;

              return (
                <motion.div
                  key={isClearance ? `cert-${index}` : `achv-${index}`}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    rotateX: direction > 0 ? -15 : 15,
                    y: direction > 0 ? -50 : 50,
                    scale: 0.9,
                  }}
                  animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    rotateX: direction > 0 ? 15 : -15,
                    y: direction > 0 ? 50 : -50,
                    scale: 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 },
                  }}
                  className={`
                  absolute inset-0 w-full h-full
                  bg-slate-900/80 backdrop-blur-xl
                  border border-slate-700/50 rounded-3xl
                  shadow-2xl shadow-black/50
                  flex flex-col overflow-hidden
                `}
                  style={{
                    boxShadow: isClearance
                      ? "0 25px 50px -12px rgba(6, 182, 212, 0.15)"
                      : "0 25px 50px -12px rgba(139, 92, 246, 0.15)",
                  }}
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-800/50 bg-gradient-to-r from-slate-900 to-slate-800/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl bg-${themeColor}-500/10 text-${themeColor}-400 border border-${themeColor}-500/20`}
                        >
                          <ThemeIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-bold font-mono uppercase tracking-wider text-${themeColor}-400`}
                            >
                              {isClearance ? "CERTIFIED" : "UNLOCKED"}
                            </span>
                            <span className="text-[10px] text-slate-600 font-mono">
                              #{String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">
                            {"name" in item ? item.name : item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 p-6 flex flex-col justify-between relative">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex flex-wrap gap-3 mb-4 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/50 border border-slate-700">
                          <Database className="w-3 h-3" />
                          <span>
                            {"issuer" in item ? item.issuer : item.highlight}
                          </span>
                        </div>
                        {"date" in item && (
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/50 border border-slate-700">
                            <Cpu className="w-3 h-3" />
                            <span>{item.date}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {activeCategory === "milestones" &&
                        "description" in item
                          ? item.description
                          : "Verified credential demonstrating proficiency in advanced technical domains. Validated through rigorous assessment protocols."}
                      </p>
                    </div>

                    {/* Footer / Scroll Hint */}
                    <div className="relative z-10 pt-4 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3 h-3" />
                        <span>
                          {index + 1} / {data.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 animate-pulse">
                        <span>SCROLL TO NAVIGATE</span>
                        <ChevronRight className="w-3 h-3 rotate-90" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ValidationStack;

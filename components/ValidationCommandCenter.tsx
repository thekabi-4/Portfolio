import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Zap,
  ChevronRight,
  Terminal,
  Cpu,
  Database,
  Lock,
  Unlock,
  Search,
  Award,
  CheckCircle,
} from "lucide-react";
import { CERTIFICATIONS, ACHIEVEMENTS } from "../constants";

type Category = "clearance" | "milestones";

const ValidationCommandCenter = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("clearance");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Reset selection when category changes
  useEffect(() => {
    setSelectedIndex(0);
    setIsTyping(true);
  }, [activeCategory]);

  // Re-trigger typing effect on selection change
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 800);
    return () => clearTimeout(timer);
  }, [selectedIndex]);

  const data = activeCategory === "clearance" ? CERTIFICATIONS : ACHIEVEMENTS;
  const safeIndex = selectedIndex >= data.length ? 0 : selectedIndex;
  const activeItem = data[safeIndex];

  if (!activeItem) return null;

  return (
    <div className="w-full min-h-[600px] bg-slate-950/80 rounded-3xl border border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/50 backdrop-blur-xl">
      {/* Left Panel: Data Stream */}
      <div className="w-full md:w-1/3 border-r border-slate-800 flex flex-col bg-slate-900/50">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
            <Terminal className="w-3 h-3" />
            <span>SECURE_CONNECTION_ESTABLISHED</span>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                setActiveCategory("clearance");
                setSelectedIndex(0);
              }}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-bold font-mono transition-all ${
                activeCategory === "clearance"
                  ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              CLEARANCE
            </button>
            <button
              onClick={() => {
                setActiveCategory("milestones");
                setSelectedIndex(0);
              }}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-bold font-mono transition-all ${
                activeCategory === "milestones"
                  ? "bg-violet-500/20 text-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              MILESTONES
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {data.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`w-full text-left p-4 border-b border-slate-800/50 transition-all hover:bg-slate-800/30 group relative ${
                selectedIndex === idx ? "bg-slate-800/50" : ""
              }`}
            >
              {selectedIndex === idx && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    activeCategory === "clearance"
                      ? "bg-cyan-500"
                      : "bg-violet-500"
                  }`}
                />
              )}

              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-mono ${
                    selectedIndex === idx
                      ? activeCategory === "clearance"
                        ? "text-cyan-400"
                        : "text-violet-400"
                      : "text-slate-500"
                  }`}
                >
                  {activeCategory === "clearance"
                    ? `CERT_0${idx + 1}`
                    : `ACHV_0${idx + 1}`}
                </span>
                {selectedIndex === idx ? (
                  <Unlock className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Lock className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                )}
              </div>

              <div
                className={`font-bold text-sm truncate ${
                  selectedIndex === idx
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {"name" in item ? item.name : item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Footer Status */}
        <div className="p-3 border-t border-slate-800 text-[10px] font-mono text-slate-600 flex justify-between bg-slate-950">
          <span>Total Records: {data.length}</span>
          <span className="animate-pulse text-emerald-500">● ONLINE</span>
        </div>
      </div>

      {/* Right Panel: Holographic Projector */}
      <div className="w-full md:w-2/3 relative bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.5),rgba(2,6,23,1))] flex flex-col">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Scan Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-scan pointer-events-none" />

        <div className="relative z-10 flex-1 p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                activeItem
                  ? "name" in activeItem
                    ? activeItem.name
                    : activeItem.title
                  : "empty"
              }
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Icon & Header */}
              <div className="flex items-start gap-6">
                <div
                  className={`
                      p-6 rounded-2xl border bg-slate-900/50 backdrop-blur-sm
                      ${
                        activeCategory === "clearance"
                          ? "border-cyan-500/30 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                          : "border-violet-500/30 text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                      }
                   `}
                >
                  {activeCategory === "clearance" ? (
                    <Shield className="w-12 h-12" />
                  ) : (
                    <Award className="w-12 h-12" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${
                        activeCategory === "clearance"
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "bg-violet-500/10 text-violet-400"
                      }`}
                    >
                      {activeCategory === "clearance"
                        ? "Verified Credential"
                        : "System Achievement"}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      ID:{" "}
                      {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {"name" in activeItem ? activeItem.name : activeItem.title}
                  </h2>
                </div>
              </div>

              {/* Details Block */}
              <div className="space-y-6">
                {/* Metadata Row */}
                <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-400 border-y border-slate-800/50 py-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-600" />
                    <span>
                      Source:{" "}
                      <span className="text-slate-200">
                        {"issuer" in activeItem
                          ? activeItem.issuer
                          : activeItem.highlight}
                      </span>
                    </span>
                  </div>
                  {"date" in activeItem && (
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-slate-600" />
                      <span>
                        Timestamp:{" "}
                        <span className="text-slate-200">
                          {activeItem.date}
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Description / Raw Data */}
                <div className="relative p-6 rounded-xl bg-slate-900/30 border border-slate-800 font-mono text-sm leading-relaxed text-slate-300">
                  {/* Typing Effect Overlay */}
                  {isTyping && (
                    <div className="absolute inset-0 bg-slate-900/90 z-10 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-cyan-500">
                        <Search className="w-4 h-4 animate-spin" />
                        <span className="text-xs tracking-widest">
                          DECRYPTING_DATA...
                        </span>
                      </div>
                    </div>
                  )}

                  <p>
                    {activeCategory === "milestones" &&
                    "description" in activeItem
                      ? activeItem.description
                      : "Authorization confirmed. This credential validates specialized knowledge in the specified domain. The holder has demonstrated proficiency through rigorous assessment protocols."}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute bottom-0 right-0 p-4 opacity-50">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-slate-700 rounded-sm" />
            <div className="w-2 h-2 bg-slate-700 rounded-sm" />
            <div className="w-2 h-2 bg-slate-700 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationCommandCenter;

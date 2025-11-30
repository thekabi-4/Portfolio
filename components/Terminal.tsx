import React from "react";
import { motion } from "framer-motion";
import {
  Terminal as TerminalIcon,
  Minimize2,
  Maximize2,
  X,
} from "lucide-react";
import { PERSONAL_INFO } from "../constants";

const Terminal: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto font-mono text-sm md:text-base"
    >
      <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 flex items-center gap-2 text-slate-400 text-xs">
              <TerminalIcon className="w-3 h-3" />
              <span>kabilesh@ai-lab:~/about</span>
            </div>
          </div>
          <div className="flex gap-2 text-slate-500">
            <Minimize2 className="w-3 h-3" />
            <Maximize2 className="w-3 h-3" />
            <X className="w-3 h-3" />
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 text-slate-300 space-y-4 font-mono">
          <div className="flex gap-2">
            <span className="text-green-400">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="text-slate-400">$</span>
            <span className="text-yellow-200">cat about_me.txt</span>
          </div>

          <div className="whitespace-pre-line leading-relaxed pl-4 border-l-2 border-slate-800">
            {PERSONAL_INFO.about}
          </div>

          <div className="flex gap-2 items-center mt-4">
            <span className="text-green-400">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="text-slate-400">$</span>
            <span className="animate-blink w-2 h-5 bg-slate-400 block"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;

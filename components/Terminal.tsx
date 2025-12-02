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
  const [text, setText] = React.useState("");
  const fullText = PERSONAL_INFO.about;

  React.useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto font-mono text-sm md:text-base"
    >
      <div className="bg-black/60 backdrop-blur-xl rounded-lg overflow-hidden border border-white/10 shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 flex items-center gap-2 text-cyan-200/50 text-xs">
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
        <div className="p-6 text-cyan-100/90 space-y-4 font-mono">
          <div className="flex gap-2">
            <span className="text-green-400">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="text-cyan-200/50">$</span>
            <span className="text-yellow-100">cat about_me.txt</span>
          </div>

          <div className="whitespace-pre-line leading-relaxed pl-4 border-l-2 border-white/10 min-h-[100px]">
            {text}
            <span className="animate-pulse inline-block w-2 h-4 bg-cyan-500/50 ml-1 align-middle" />
          </div>

          <div className="flex gap-2 items-center mt-4">
            <span className="text-green-400">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="text-cyan-200/50">$</span>
            <span className="animate-blink w-2 h-5 bg-cyan-500/50 block"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;

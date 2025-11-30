import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../constants";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
      } else {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative inline-block group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          <div className="relative px-6 py-2 bg-slate-900 ring-1 ring-slate-800 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-mono text-cyan-400 tracking-wider">
              SYSTEM READY
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-8 font-mono h-12"
        >
          {text}
          <span className="animate-blink border-r-2 border-cyan-400 ml-1"></span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed whitespace-pre-line"
        >
          {PERSONAL_INFO.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-cyan-500 text-slate-900 font-bold rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-cyan-500/50 text-cyan-400 font-bold rounded-full hover:bg-cyan-950/30 transition-all hover:border-cyan-400"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 flex gap-6 justify-center items-center"
        >
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-900/50 hover:bg-slate-800 rounded-full border border-slate-700 hover:border-cyan-500/50 transition-all group"
          >
            <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-900/50 hover:bg-slate-800 rounded-full border border-slate-700 hover:border-cyan-500/50 transition-all group"
          >
            <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-3 bg-slate-900/50 hover:bg-slate-800 rounded-full border border-slate-700 hover:border-cyan-500/50 transition-all group"
          >
            <Mail className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <a
          href="#about"
          className="text-gray-500 hover:text-cyan-400 transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;

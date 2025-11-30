import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <section
      id={id}
      className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 relative ${className}`}
    >
      {/* Connecting Line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-900/50 to-transparent hidden md:block" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-cyan-500 rounded-full inline-block"></span>
            {title}
          </h2>
          {subtitle && <p className="text-gray-400 text-lg ml-5">{subtitle}</p>}
        </div>
        {children}
      </motion.div>
    </section>
  );
};

export default Section;

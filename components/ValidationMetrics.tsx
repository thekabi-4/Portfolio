import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Award, CheckCircle, Shield, Zap } from "lucide-react";
import { CERTIFICATIONS, ACHIEVEMENTS } from "../constants";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className={`relative group ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ValidationMetrics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
      {/* Certifications Column */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 font-mono">
          <Shield className="text-cyan-400" /> // Security_Clearance
        </h3>
        <div className="grid gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <TiltCard key={idx} className="h-full">
              <div className="relative h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-xl overflow-hidden group-hover:border-cyan-500/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                  className="relative z-10 flex items-start gap-4"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="p-3 bg-slate-800/50 rounded-lg text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">
                      {cert.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 text-xs font-mono text-slate-500 group-hover:text-cyan-400/70 transition-colors">
                      <span>{cert.issuer}</span>
                      <span>//</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Tech Decoration */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                  <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Achievements Column */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 font-mono">
          <Zap className="text-violet-400" /> // System_Milestones
        </h3>
        <div className="grid gap-4">
          {ACHIEVEMENTS.map((achievement, idx) => (
            <TiltCard key={idx} className="h-full">
              <div className="relative h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-xl overflow-hidden group-hover:border-violet-500/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                  className="relative z-10"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="px-2 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-400">
                      ACHIEVEMENT_UNLOCKED
                    </div>
                    <CheckCircle className="w-5 h-5 text-slate-600 group-hover:text-violet-400 transition-colors" />
                  </div>

                  <h4 className="text-lg font-bold text-slate-200 group-hover:text-white mb-2 transition-colors">
                    {achievement.title}
                  </h4>

                  <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors">
                    {achievement.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="text-violet-500/70">&gt;</span>
                    {achievement.highlight}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidationMetrics;

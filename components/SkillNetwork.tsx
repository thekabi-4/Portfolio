import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS } from "../constants";

const SkillNetwork = () => {
  const [radius, setRadius] = useState(280);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setRadius(140);
        setIsMobile(true);
      } else if (width < 1024) {
        setRadius(220);
        setIsMobile(false);
      } else {
        setRadius(300);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pre-calculate node positions
  const nodes = SKILLS.map((skill, i) => {
    // Start from -90 degrees (Top) instead of 0 (Right)
    const angle = (i / SKILLS.length) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Determine quadrant/direction for tooltip
    // Convert angle to degrees for easier logic (0 to 360)
    let degrees = (angle * 180) / Math.PI;
    degrees = (degrees + 360) % 360; // Normalize

    // Adjusted logic for rotated layout
    // 270 (-90) is Top. 0 is Right. 90 is Bottom. 180 is Left.
    // We want tooltips to point OUTWARDS.

    let tooltipPosition = "right"; // default

    // Top Quadrant (approx 225 to 315) -> Tooltip Top
    if (degrees >= 225 && degrees < 315) tooltipPosition = "top";
    // Right Quadrant (approx 315 to 45) -> Tooltip Right
    else if (degrees >= 315 || degrees < 45) tooltipPosition = "right";
    // Bottom Quadrant (approx 45 to 135) -> Tooltip Bottom
    else if (degrees >= 45 && degrees < 135) tooltipPosition = "bottom";
    // Left Quadrant (approx 135 to 225) -> Tooltip Left
    else if (degrees >= 135 && degrees < 225) tooltipPosition = "left";

    return { ...skill, x, y, angle, tooltipPosition };
  });

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-slate-900/50 rounded-xl border border-slate-800 flex items-center justify-center overflow-visible">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] rounded-xl overflow-hidden pointer-events-none" />

      {/* Central Hub */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="absolute z-20"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 bg-cyan-950/90 rounded-full border-4 border-cyan-500 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.6)] relative group cursor-default">
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping" />
          <span className="text-cyan-50 text-lg md:text-xl font-bold font-mono tracking-wider text-center leading-tight">
            AI / ML
          </span>
        </div>
      </motion.div>

      {/* Nodes & Lines */}
      {nodes.map((node, i) => {
        // Line Endpoints
        const centerHubRadius = isMobile ? 48 : 64;
        // Mobile node is w-20 (80px) -> radius 40. Desktop w-24 (96px) -> radius 48.
        const nodeRadius = isMobile ? 40 : 48;

        const lineStartX = Math.cos(node.angle) * centerHubRadius;
        const lineStartY = Math.sin(node.angle) * centerHubRadius;
        const lineEndX = Math.cos(node.angle) * (radius - nodeRadius);
        const lineEndY = Math.sin(node.angle) * (radius - nodeRadius);

        return (
          <React.Fragment key={node.category}>
            {/* Connection Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              <defs>
                <filter
                  id="glow-line"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.line
                x1={`calc(50% + ${lineStartX}px)`}
                y1={`calc(50% + ${lineStartY}px)`}
                x2={`calc(50% + ${lineEndX}px)`}
                y2={`calc(50% + ${lineEndY}px)`}
                stroke="#06b6d4"
                strokeWidth="2"
                strokeOpacity="0.6"
                filter="url(#glow-line)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>

            {/* Category Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              style={{
                position: "absolute",
                top: `calc(50% + ${node.y}px)`,
                left: `calc(50% + ${node.x}px)`,
                transform: "translate(-50%, -50%)",
              }}
              className="z-10"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-900 rounded-full border-2 border-violet-500/50 flex items-center justify-center hover:bg-violet-900/80 hover:border-violet-400 transition-all duration-300 z-10 relative shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                  <span className="text-[10px] md:text-xs text-center text-violet-100 font-mono font-semibold px-2 leading-tight">
                    {node.category}
                  </span>
                </div>

                {/* Orbiting Ring Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 border border-dashed border-cyan-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 pointer-events-none animate-spin-slow" />

                {/* Dynamic Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute w-56 md:w-64 bg-slate-900/95 border border-cyan-500/50 p-4 rounded-xl z-50 backdrop-blur-xl shadow-2xl pointer-events-none
                        ${
                          node.tooltipPosition === "right"
                            ? "left-full top-1/2 -translate-y-1/2 ml-4"
                            : ""
                        }
                        ${
                          node.tooltipPosition === "left"
                            ? "right-full top-1/2 -translate-y-1/2 mr-4"
                            : ""
                        }
                        ${
                          node.tooltipPosition === "top"
                            ? "bottom-full left-1/2 -translate-x-1/2 mb-4"
                            : ""
                        }
                        ${
                          node.tooltipPosition === "bottom"
                            ? "top-full left-1/2 -translate-x-1/2 mt-4"
                            : ""
                        }
                      `}
                    >
                      <h4 className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-widest border-b border-cyan-500/20 pb-1">
                        Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {node.items.map((item) => (
                          <span
                            key={item}
                            className="text-[10px] md:text-xs bg-cyan-950 text-cyan-200 px-2 py-1 rounded border border-cyan-800/50"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SkillNetwork;

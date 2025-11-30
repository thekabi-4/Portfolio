import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS } from "../constants";

const SkillNetwork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Responsive Breakpoints
  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;

  // Configuration
  const CENTER_RADIUS = isMobile ? 40 : isTablet ? 50 : 65; // Slightly larger center
  const NODE_RADIUS = isMobile ? 28 : isTablet ? 35 : 45; // Slightly larger nodes

  // Orbit Radius Calculation
  const baseOrbit = isTablet ? 220 : 300;
  const ORBIT_RADIUS = isMobile
    ? 0
    : Math.min(dimensions.width * 0.35, baseOrbit);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      if (containerRef.current) {
        // Debounce resize
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (containerRef.current) {
            setDimensions({
              width: containerRef.current.clientWidth,
              height: containerRef.current.clientHeight,
            });
          }
        }, 100);
      }
    };

    // Initial call without debounce to prevent flash
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Calculate Node Positions & Quadrants
  const nodes = useMemo(() => {
    const totalNodes = SKILLS.length;

    return SKILLS.map((skill, index) => {
      if (isMobile) {
        // Mobile: Stacked Layout (No radial calculation needed)
        return { ...skill, x: 0, y: 0, angle: 0, quadrant: "center" };
      }

      // Radial Layout
      const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2; // Start from top
      const x = Math.cos(angle) * ORBIT_RADIUS;
      const y = Math.sin(angle) * ORBIT_RADIUS;

      // Determine Quadrant for Tooltip Placement
      let quadrant = "right";

      // Use angular sectors for better precision
      if (Math.abs(y) > Math.abs(x)) {
        quadrant = y < 0 ? "top" : "bottom";
      } else {
        quadrant = x < 0 ? "left" : "right";
      }

      return {
        ...skill,
        x,
        y,
        angle,
        quadrant,
      };
    });
  }, [ORBIT_RADIUS, isMobile]);

  // Helper to get tooltip position styles
  const getTooltipProps = (quadrant: string) => {
    const offset = 25; // Increased offset
    switch (quadrant) {
      case "top":
        return {
          style: { bottom: "100%", left: "50%" },
          x: "-50%",
          y: -offset,
        };
      case "bottom":
        return {
          style: { top: "100%", left: "50%" },
          x: "-50%",
          y: offset,
        };
      case "left":
        return {
          style: { right: "100%", top: "50%" },
          x: -offset,
          y: "-50%",
        };
      case "right":
        return {
          style: { left: "100%", top: "50%" },
          x: offset,
          y: "-50%",
        };
      default:
        return {
          style: { left: "100%", top: "50%" },
          x: offset,
          y: "-50%",
        };
    }
  };

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center overflow-hidden bg-slate-950/50 rounded-3xl border border-slate-800/50 ${
        isMobile ? "h-auto py-10 min-h-[600px]" : "h-[600px] md:h-[800px]"
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Neural Lines Layer (SVG) - Desktop/Tablet Only */}
      {!isMobile && dimensions.width > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
              <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0.5)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {nodes.map((node, i) => {
            const cos = Math.cos(node.angle);
            const sin = Math.sin(node.angle);

            // Calculate start and end points for the line
            // Start at center node edge
            const startX = centerX + cos * CENTER_RADIUS;
            const startY = centerY + sin * CENTER_RADIUS;
            // End at child node edge
            const endX = centerX + cos * (ORBIT_RADIUS - NODE_RADIUS);
            const endY = centerY + sin * (ORBIT_RADIUS - NODE_RADIUS);

            return (
              <motion.g key={`line-${i}`}>
                <motion.line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  filter="url(#glow)"
                />
                {/* Traveling Pulse */}
                <motion.circle
                  r="3"
                  fill="#fff"
                  initial={{ offsetDistance: "0%" }}
                  animate={{
                    cx: [startX, endX],
                    cy: [startY, endY],
                    opacity: [0, 1, 1, 0], // Fade in -> stay -> fade out
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear",
                  }}
                />
              </motion.g>
            );
          })}
        </svg>
      )}

      {/* Container for Nodes */}
      <div
        className={`relative z-20 ${
          isMobile
            ? "flex flex-col gap-6 items-center w-full px-4"
            : "w-full h-full"
        }`}
      >
        {/* Central Hub */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className={`${
            isMobile
              ? "relative mb-8"
              : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          } z-20`}
        >
          <div
            className="relative flex items-center justify-center rounded-full bg-slate-950 border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.6)]"
            style={{ width: CENTER_RADIUS * 2, height: CENTER_RADIUS * 2 }}
          >
            <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping opacity-20" />
            <div className="text-center z-10 flex flex-col items-center justify-center">
              <span className="block text-cyan-50 font-bold font-mono tracking-wider text-base md:text-xl">
                AI / ML
              </span>
              <span className="block text-[10px] text-cyan-400 font-mono mt-0.5 tracking-widest">
                CORE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Child Nodes */}
        {nodes.map((node, i) => {
          const tooltipProps = !isMobile
            ? getTooltipProps(node.quadrant)
            : null;

          return (
            <div
              key={node.category}
              className={`${
                isMobile
                  ? "relative w-full max-w-sm"
                  : "absolute top-1/2 left-1/2"
              } transition-all duration-300`}
              style={{
                zIndex: hoveredIndex === i ? 50 : 30,
                ...(!isMobile
                  ? {
                      transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))`,
                    }
                  : {}),
              }}
              onMouseEnter={!isMobile ? () => setHoveredIndex(i) : undefined}
              onMouseLeave={!isMobile ? () => setHoveredIndex(null) : undefined}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                whileHover={!isMobile ? { scale: 1.1 } : {}}
                className={`relative cursor-pointer group ${
                  isMobile
                    ? "flex items-center gap-4 bg-slate-900/40 p-3 rounded-xl border border-slate-800"
                    : ""
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`
                    flex items-center justify-center rounded-full bg-slate-950 
                    border-2 border-violet-500/60 group-hover:border-violet-400 group-hover:bg-slate-900
                    shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_35px_rgba(139,92,246,0.6)]
                    transition-all duration-300 shrink-0
                  `}
                  style={{ width: NODE_RADIUS * 2, height: NODE_RADIUS * 2 }}
                >
                  <span className="text-[10px] md:text-[11px] text-center text-violet-100 font-mono font-bold px-2 leading-tight tracking-tight">
                    {node.category}
                  </span>
                </div>

                {/* Mobile: Inline Content */}
                {isMobile && (
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {node.items.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="text-[10px] bg-slate-800 text-cyan-100 px-2 py-0.5 rounded border border-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                      {node.items.length > 4 && (
                        <span className="text-[10px] text-slate-400 px-1">
                          +{node.items.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Desktop/Tablet: Hover Card */}
                {!isMobile && tooltipProps && (
                  <AnimatePresence>
                    {hoveredIndex === i && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          x: tooltipProps.x,
                          y: tooltipProps.y,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: tooltipProps.x,
                          y: tooltipProps.y,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          x: tooltipProps.x,
                          y: tooltipProps.y,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute",
                          ...tooltipProps.style,
                          zIndex: 50,
                        }}
                        className="w-64 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 p-4 rounded-xl shadow-2xl pointer-events-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 rounded-xl" />
                        <h4 className="relative text-cyan-400 text-xs font-bold mb-3 uppercase tracking-widest border-b border-cyan-500/20 pb-2">
                          {node.category} Stack
                        </h4>
                        <div className="relative flex flex-wrap gap-2">
                          {node.items.map((item) => (
                            <span
                              key={item}
                              className="text-[10px] bg-slate-800/80 text-cyan-100 px-2 py-1 rounded border border-slate-700/50 shadow-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillNetwork;

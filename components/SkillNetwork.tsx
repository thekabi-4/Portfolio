import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS } from "../constants";

// Tooltip Component with Auto-Scroll
const Tooltip = ({ children, ...props }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, []);

  return (
    <motion.div ref={ref} {...props}>
      {children}
    </motion.div>
  );
};

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
        return {
          ...skill,
          x: 0,
          y: 0,
          angle: 0,
          quadrant: "center",
        };
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
  }, [ORBIT_RADIUS, isMobile, dimensions.width]);

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

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        isMobile ? "h-auto min-h-[600px]" : "h-[600px] md:h-[800px]"
      }`}
    >
      {/* Background & Border Layer (Clipped) */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 bg-black/50 overflow-hidden z-0">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* Content Layer (Visible Overflow for Tooltips) */}
      <div
        className={`relative w-full h-full flex items-center justify-center z-20 ${
          isMobile ? "py-10" : ""
        }`}
      >
        {/* Container for Nodes and Lines */}
        <div
          className={`relative w-full h-full ${
            isMobile ? "flex flex-col gap-6 items-center px-4" : ""
          }`}
        >
          {/* CSS Lines Layer - Desktop/Tablet Only */}
          {!isMobile &&
            nodes.map((node, i) => {
              const lineLength = ORBIT_RADIUS - NODE_RADIUS - CENTER_RADIUS;

              return (
                <div
                  key={`line-${i}`}
                  className="absolute left-1/2 top-1/2 h-[2px] origin-left z-10 pointer-events-none"
                  style={{
                    width: `${lineLength}px`,
                    transform: `rotate(${node.angle}rad) translate(${CENTER_RADIUS}px, -50%)`,
                    background:
                      "linear-gradient(90deg, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0.5) 50%, rgba(139,92,246,0.5) 100%)",
                  }}
                >
                  {/* Traveling Pulse */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{
                      left: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "linear",
                    }}
                  />
                </div>
              );
            })}

          {/* Central Hub */}
          <div
            className={`${
              isMobile
                ? "relative mb-8"
                : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            } z-20`}
            style={
              !isMobile
                ? {
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }
                : {}
            }
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1 }}
            >
              <div
                className="relative flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.4)]"
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
          </div>

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
                        left: "50%",
                        top: "50%",
                        transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))`,
                      }
                    : {}),
                }}
                onMouseEnter={!isMobile ? () => setHoveredIndex(i) : undefined}
                onMouseLeave={
                  !isMobile ? () => setHoveredIndex(null) : undefined
                }
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                  whileHover={!isMobile ? { scale: 1.1 } : {}}
                  className={`relative cursor-pointer group ${
                    isMobile
                      ? "flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/10"
                      : ""
                  }`}
                >
                  {/* Node Circle */}
                  <div
                    className={`
                    flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm
                    border border-violet-500/40 group-hover:border-violet-400 group-hover:bg-black/80
                    shadow-[0_0_15px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]
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
                            className="text-[10px] bg-black/60 text-cyan-100 px-2 py-0.5 rounded border border-white/10"
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
                        <Tooltip
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
                          className="w-64 bg-black/80 backdrop-blur-xl border border-cyan-500/20 p-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-none"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 rounded-xl" />
                          <h4 className="relative text-cyan-400 text-xs font-bold mb-3 uppercase tracking-widest border-b border-cyan-500/20 pb-2">
                            {node.category} Stack
                          </h4>
                          <div className="relative flex flex-wrap gap-2">
                            {node.items.map((item) => (
                              <span
                                key={item}
                                className="text-[10px] bg-black/80 text-cyan-100 px-2 py-1 rounded border border-white/10 shadow-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </Tooltip>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillNetwork;

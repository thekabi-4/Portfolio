import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.5 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 12,
          translateY: 12,
        }}
      />
    </>
  );
};

export default CustomCursor;

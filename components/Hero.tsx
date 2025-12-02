import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Sphere,
  Float,
  Stars,
  Text,
} from "@react-three/drei";
import { PERSONAL_INFO } from "../constants";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  MousePointer2,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";

// --- 3D Components ---

const SentientCore = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Organic rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;

      // Pulse effect based on mouse proximity (simulated by hover for now)
      const scale = hovered ? 2.2 : 2;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere
        args={[1, 64, 64]}
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#00ffff" : "#22d3ee"}
          attach="material"
          distort={0.6} // Strength of distortion
          speed={2} // Speed of distortion
          roughness={0.2}
          metalness={0.8}
          emissive="#0891b2"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <SentientCore />
    </>
  );
};

// --- UI Components ---

const MagneticButton = ({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3); // Magnetic pull strength
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center px-8 py-4 font-bold text-sm tracking-widest uppercase transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.a>
  );
};

const DecryptText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <Scene />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-8 pointer-events-auto mix-blend-difference">
          {/* Role Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-cyan-400/80 font-mono text-xs tracking-[0.3em] uppercase"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            System Online
          </motion.div>

          {/* Main Title */}
          <div className="relative">
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none">
              <DecryptText
                text={PERSONAL_INFO.name.split(" ")[0].toUpperCase()}
              />
            </h1>
            <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-tighter leading-none">
              <DecryptText
                text={PERSONAL_INFO.name.split(" ")[1].toUpperCase()}
              />
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-gray-400 font-light text-lg md:text-xl max-w-md mx-auto leading-relaxed"
          >
            Architecting <span className="text-cyan-300">intelligence</span>{" "}
            from chaos.
            <br />
            Full-stack AI/ML Developer.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
          >
            <MagneticButton
              href="#projects"
              className="bg-white text-black hover:bg-cyan-300 border border-transparent rounded-full"
            >
              View Work
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="text-white border border-white/20 hover:border-cyan-400 hover:text-cyan-400 rounded-full backdrop-blur-sm"
            >
              Contact
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Social Links - Absolute Bottom */}
      <div className="absolute bottom-10 left-10 z-20 hidden md:flex flex-col gap-6">
        {[
          { href: PERSONAL_INFO.github, icon: Github },
          { href: PERSONAL_INFO.linkedin, icon: Linkedin },
          { href: `mailto:${PERSONAL_INFO.email}`, icon: Mail },
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyan-400 transition-colors transform hover:scale-110"
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-10 z-20 flex items-center gap-3 text-gray-500 font-mono text-xs tracking-widest">
        <span>SCROLL</span>
        <div className="w-12 h-[1px] bg-gray-700 overflow-hidden">
          <div className="w-full h-full bg-cyan-400 animate-progress origin-left" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

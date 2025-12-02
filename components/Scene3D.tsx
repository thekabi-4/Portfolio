import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars, Text } from "@react-three/drei";

const NetEffect = () => {
  const count = 60;
  const radius = 2;
  const connectionDistance = 1.0;
  const maxConnections = 2000;

  // Particles state
  const [particles] = React.useState(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return { pos, vel };
  });

  const pointsRef = useRef<any>(null);
  const linesRef = useRef<any>(null);
  const linePositions = useMemo(() => new Float32Array(maxConnections * 6), []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    let lineIndex = 0;
    const { pos, vel } = particles;

    // Update particles
    for (let i = 0; i < count; i++) {
      // Movement
      pos[i * 3] += vel[i * 3];
      pos[i * 3 + 1] += vel[i * 3 + 1];
      pos[i * 3 + 2] += vel[i * 3 + 2];

      // Bounce off bounds
      if (Math.abs(pos[i * 3]) > radius) vel[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > radius) vel[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > radius) vel[i * 3 + 2] *= -1;

      // Mouse interaction (simple repulsion)
      const dx = state.pointer.x * 2 - pos[i * 3];
      const dy = state.pointer.y * 2 - pos[i * 3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) {
        pos[i * 3] -= dx * 0.01;
        pos[i * 3 + 1] -= dy * 0.01;
      }
    }

    // Update lines
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          if (lineIndex < maxConnections) {
            linePositions[lineIndex * 6] = pos[i * 3];
            linePositions[lineIndex * 6 + 1] = pos[i * 3 + 1];
            linePositions[lineIndex * 6 + 2] = pos[i * 3 + 2];
            linePositions[lineIndex * 6 + 3] = pos[j * 3];
            linePositions[lineIndex * 6 + 4] = pos[j * 3 + 1];
            linePositions[lineIndex * 6 + 5] = pos[j * 3 + 2];
            lineIndex++;
          }
        }
      }
    }

    // Update geometry
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate group slightly
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.y += 0.001;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={particles.pos} stride={3}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxConnections * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

const Scene3D: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <NetEffect />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default Scene3D;

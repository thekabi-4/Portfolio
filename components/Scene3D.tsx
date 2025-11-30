import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars, Text } from "@react-three/drei";

const NetEffect = () => {
  const count = 100;
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
          size={0.04}
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
          opacity={0.6}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

const FloatingShapes = () => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const { x, y } = state.pointer;
      groupRef.current.position.x = x * 0.5;
      groupRef.current.position.y = y * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[1, 0.5, 0]} scale={0.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-1, -0.5, 0.5]} scale={0.15}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
      </Float>
    </group>
  );
};

function FloatingFormulas() {
  const formulas = [
    "y = mx + b",
    "E = mc^2",
    "f(x) = 1 / (1 + e^-x)",
    "∇f(x) = 0",
    "P(A|B) = P(B|A)P(A)/P(B)",
    "Attention(Q,K,V)",
    "ReLU(x) = max(0,x)",
    "L = -Σ y log(ŷ)",
  ];

  return (
    <group>
      {formulas.map((formula, i) => (
        <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 10,
            ]}
            color="#06b6d4"
            fontSize={0.3}
            font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.3}
          >
            {formula}
          </Text>
        </Float>
      ))}
    </group>
  );
}

const Scene3D: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <NetEffect />
        <FloatingShapes />
        <FloatingFormulas />
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

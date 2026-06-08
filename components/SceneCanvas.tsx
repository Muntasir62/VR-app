"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function SceneCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Canvas camera={{ position: [0, 8, 12], fov: 60 }}>
        <OrbitControls />
      <ambientLight intensity={2} />

      <directionalLight position={[5, 5, 5]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
         <meshStandardMaterial color="#444444" />
      </mesh>

      {children}
    </Canvas>
  );
}
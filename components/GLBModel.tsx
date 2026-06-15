"use client";

import { useGLTF } from "@react-three/drei";

type Props = {
  path: string;
  position: [number, number, number];
};

export default function GLBModel({ path, position }: Props) {
  const { scene } = useGLTF(path);

  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={0.5}   // (adjust size )
    />
  );
}
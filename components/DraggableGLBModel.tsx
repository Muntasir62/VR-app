"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  id: number;
  path: string;
  position: [number, number, number];
  scale?: number;
  onMove: (id: number, pos: [number, number, number]) => void;
};

export default function DraggableGLBModel({
  id,
  path,
  position,
  scale = 0.5,
  onMove,
}: Props) {
  const { scene } = useGLTF(path);
  const ref = useRef<THREE.Group>(null);

  const isDragging = useRef(false);

  return (
    <primitive
      ref={ref}
      object={scene.clone()}
      position={position}
      scale={scale}
      onPointerDown={(e: any) => {
        e.stopPropagation();
        isDragging.current = true;
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      onPointerMove={(e: any) => {
        if (!isDragging.current) return;

        e.stopPropagation();

        // convert pointer movement to world movement
        const [x, , z] = position;

        onMove(id, [
          x + e.movementX * 0.01,
          position[1],
          z + e.movementY * 0.01,
        ]);
      }}
    />
  );
}
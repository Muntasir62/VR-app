"use client";

import { useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";

type Props = {
  id: number;
  position: [number, number, number];
  onMove: (
    id: number,
    position: [number, number, number]
  ) => void;
};

export default function DraggableSphere({
  id,
  position,
  onMove,
}: Props) {
  const dragging = useRef(false);

  const handlePointerDown = () => {
    dragging.current = true;
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const handlePointerMove = (
    e: ThreeEvent<PointerEvent>
  ) => {
    if (!dragging.current) return;

    onMove(id, [
      e.point.x,
      0.5,
      e.point.z,
    ]);
  };

  return (
    <mesh
      position={position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
}
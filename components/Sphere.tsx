export default function Sphere({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.6, 32, 32]} />
       <meshStandardMaterial color="blue" />
    </mesh>
  );
}
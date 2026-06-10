"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SceneCanvas from "@/components/SceneCanvas";
//import Cube from "@/components/Cube";
//import Sphere from "@/components/Sphere";
import DraggableCube from "@/components/DraggableCube";
import DraggableSphere from "@/components/DraggableSphere";
import AddObjectModal from "@/components/AddObjectModal";

type ObjectType = {
  id: number;
  type: "cube" | "sphere";
  position: [number, number, number];
};

export default function ScenePage() {
  const router = useRouter();

  const [objects, setObjects] = useState<ObjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] =
  useState(false);

const [selectedType, setSelectedType] =
  useState<"cube" | "sphere">("cube");

  // 🔐 AUTH CHECK (runs once on page load)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          router.push("/login");
          return;
        }

        setLoading(false);
      } catch (err) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const randomPosition = (): [number, number, number] => {
    return [
      Math.random() * 8 - 4,
      0.5,
      Math.random() * 8 - 4,
    ];
  };

  const addCube = () => {
    setObjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "cube",
        position: randomPosition(),
      },
    ]);

  };


  const addSphere = () => {
    setObjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "sphere",
        position: randomPosition(),
      },
    ]);
  };

  const moveObject = (
  id: number,
  newPosition: [number, number, number]
) => {
  setObjects((prev) =>
    prev.map((obj) =>
      obj.id === id
        ? {
            ...obj,
            position: newPosition,
          }
        : obj
    )
  );
};
const handleAddObject = () => {
  if (selectedType === "cube") {
    addCube();
  } else {
    addSphere();
  }

  setModalOpen(false);
};

  // ⏳ Prevent flash before auth check finishes
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading scene...
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* UI Controls */}
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          padding: "20px",
        }}
      >
      
       {/* <button onClick={addCube}>
          Add Cube
        </button>

        <button
          onClick={addSphere}
          style={{ marginLeft: "10px" }}
        >
          Add Sphere
        </button>
        */}
        <button
          onClick={() => setModalOpen(true)}
>
          Add Object
        </button>
      </div>
      <AddObjectModal
        isOpen={modalOpen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onAdd={handleAddObject}
        onClose={() => setModalOpen(false)}
      />
      {/* 3D Scene */}
      <SceneCanvas>
        {objects.map((obj) => {
          if (obj.type === "cube") {
            return (
             /* <Cube
                key={obj.id}
                position={obj.position}
              />
              */
             <DraggableCube
             key={obj.id}
             id={obj.id}
             position={obj.position}
             onMove={moveObject}
             />
             
            );
          }

          return (
            /*<Sphere
              key={obj.id}
              position={obj.position}
            />
            */
           <DraggableSphere
            key={obj.id}
            id={obj.id}
            position={obj.position}
            onMove={moveObject}
            />          
          );
        })}
      </SceneCanvas>
    </div>
  );
}
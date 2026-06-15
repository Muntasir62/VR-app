"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SceneCanvas from "@/components/SceneCanvas";
import DraggableCube from "@/components/DraggableCube";
import DraggableSphere from "@/components/DraggableSphere";
import AddObjectModal from "@/components/AddObjectModal";
import { useGLTF } from "@react-three/drei";
import { SceneObject, ObjectTypeName } from "@/types/scene";
import DraggableGLBModel from "@/components/DraggableGLBModel";

useGLTF.preload("/models/DeskChair.glb");
useGLTF.preload("/models/Desk.glb");
useGLTF.preload("/models/RobotEnemy.glb");

export default function ScenePage() {
  const router = useRouter();

  const [objects, setObjects] = useState<SceneObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedType, setSelectedType] =
    useState<ObjectTypeName>("cube");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          router.push("/login");
          return;
        }

        setLoading(false);
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const loadScene = async () => {
      const res = await fetch("/api/scene/load");
      const data = await res.json();

      if (data.objects) setObjects(data.objects);
    };

    loadScene();
  }, []);

  const randomPosition = (): [number, number, number] => [
    Math.random() * 8 - 4,
    0.5,
    Math.random() * 8 - 4,
  ];

  const moveObject = (
    id: number,
    newPosition: [number, number, number]
  ) => {
    setObjects((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, position: newPosition } : obj
      )
    );
  };

  const handleAddObject = () => {
    setObjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: selectedType,
        position: randomPosition(),
      },
    ]);

    setModalOpen(false);
  };

  const saveScene = async () => {
    const res = await fetch("/api/scene/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objects }),
    });

    const data = await res.json();
    alert(data.message);
  };
const logout = async () => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  } catch (err) {
    console.error(err);
  }
};
  const modelMap: Record<string, string> = {
    deskChair: "/models/DeskChair.glb",
    desk: "/models/Desk.glb",
    robot: "/models/RobotEnemy.glb",
  };

  const modelTransform: Record<
    string,
    { scale: number; y: number }
  > = {
    deskChair: { scale: 2.0, y: 0 },
    desk: { scale: 1.6, y: 0 },
    robot: { scale: 1.9, y: 1.6 },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading scene...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen relative">
      {/* UI */}
      <div className="absolute top-4 left-4 flex gap-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 z-10">
        <button
          onClick={saveScene}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
        >
          💾 Save Scene
        </button>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
        >
          ➕ Add Object
        </button>
        <button
      onClick={logout}
      className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
       >
      🚪 Logout
       </button>
      </div>

      {/* Modal */}
      <AddObjectModal
        isOpen={modalOpen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onAdd={handleAddObject}
        onClose={() => setModalOpen(false)}
      />

      {/* Scene */}
      <SceneCanvas>
        {objects.map((obj) => {
          if (obj.type === "cube") {
            return (
              <DraggableCube
                key={obj.id}
                id={obj.id}
                position={obj.position}
                onMove={moveObject}
              />
            );
          }

          if (obj.type === "sphere") {
            return (
              <DraggableSphere
                key={obj.id}
                id={obj.id}
                position={obj.position}
                onMove={moveObject}
              />
            );
          }

          const t = modelTransform[obj.type];

          return (
            <DraggableGLBModel
              key={obj.id}
              id={obj.id}
              path={modelMap[obj.type]}
              position={[
                obj.position[0],
                t?.y ?? obj.position[1],
                obj.position[2],
              ]}
              scale={t?.scale ?? 0.5}
              onMove={moveObject}
            />
          );
        })}
      </SceneCanvas>
    </div>
  );
}
"use client";

import { ObjectTypeName } from "@/types/scene";

type Props = {
  isOpen: boolean;
  selectedType: ObjectTypeName;
  setSelectedType: (type: ObjectTypeName) => void;
  onAdd: () => void;
  onClose: () => void;
};

const options: { label: string; value: ObjectTypeName }[] = [
  { label: "Cube", value: "cube" },
  { label: "Sphere", value: "sphere" },
  { label: "Desk Chair", value: "deskChair" },
  { label: "Desk", value: "desk" },
  { label: "Robot Enemy", value: "robot" },
];

export default function AddObjectModal({
  isOpen,
  selectedType,
  setSelectedType,
  onAdd,
  onClose,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
      <div className="w-[340px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-5 text-white shadow-2xl">

        <h2 className="text-lg font-semibold mb-4">
          Select Object
        </h2>

        <div className="grid gap-2">
          {options.map((opt) => {
            const active = selectedType === opt.value;

            return (
              <button
                key={opt.value}
                onClick={() => setSelectedType(opt.value)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg border transition
                  ${active
                    ? "bg-indigo-500/30 border-indigo-400"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                  }
                `}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onAdd}
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 font-semibold hover:scale-[1.02] transition"
          >
            Add
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
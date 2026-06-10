"use client";

type Props = {
  isOpen: boolean;
  selectedType: "cube" | "sphere";
  setSelectedType: (
    type: "cube" | "sphere"
  ) => void;
  onAdd: () => void;
  onClose: () => void;
};

export default function AddObjectModal({
  isOpen,
  selectedType,
  setSelectedType,
  onAdd,
  onClose,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        //color: "#ffffff",  
        padding: "20px",
        borderRadius: "10px",
        minWidth: "300px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",    
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
         background: "#ffffff",
         color: "#111111",
         padding: "20px",
         borderRadius: "8px",
         minWidth: "300px",
         boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
       }}     
       
      >
        <h2 style={{ marginBottom: "15px" }}>
            Select Object
            </h2>

        <div>
          <label style={{ display: "block", marginBottom: "10px" }}>
            <input
              type="radio"
              checked={selectedType === "cube"}
              onChange={() =>
                setSelectedType("cube")
              }
            />
            <span style={{ marginLeft: "8px" }}>Cube</span>
            
          </label>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "10px" }}>
            <input
              type="radio"
              checked={selectedType === "sphere"}
              onChange={() =>
                setSelectedType("sphere")
              }
            />
            <span style={{ marginLeft: "8px" }}>Sphere</span>
            
          </label>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button onClick={onAdd}
            style={{
           padding: "6px 12px",
           background: "#4f46e5",
           color: "white",
           border: "none",
           borderRadius: "6px",
           cursor: "pointer",
         }}
         >
            Add
          </button>

          <button onClick={onClose}
           style={{
           padding: "6px 12px",
           background: "#555",
           color: "white",
           border: "none",
           borderRadius: "6px",
           cursor: "pointer",
         }}
         >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
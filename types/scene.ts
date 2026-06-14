export type ObjectTypeName =
  | "cube"
  | "sphere"

  | "deskChair"
  | "desk"
  | "robot";

export type SceneObject = {
  id: number;
  type: ObjectTypeName;
  position: [number, number, number];
};
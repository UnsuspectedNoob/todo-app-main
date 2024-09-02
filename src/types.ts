import { Dispatch, SetStateAction } from "react";

export type TaskType = {
  name: string;
  completed: boolean;
  id: number | string;
};

export type View = "all" | "active" | "completed";

export type SetState<T> = Dispatch<SetStateAction<T>>;

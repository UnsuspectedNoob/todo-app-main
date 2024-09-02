import { ReactNode, useState } from "react";
import { createContext } from "react";
import { SetState, TaskType, View } from "../types";

type TaskContext = {
  allTasks: TaskType[];
  setAllTasks: SetState<TaskType[]>;
  currentView: View;
  setCurrentView: SetState<View>;
  id: number | string;
  setId: SetState<number>;
};

export const AllTasksContext = createContext<TaskContext>({
  allTasks: [],
  setAllTasks: () => {},
  currentView: "all",
  setCurrentView: () => {},
  id: 0,
  setId: () => {},
});

function TasksProvider({ children }: { children: ReactNode }) {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [currentView, setCurrentView] = useState<View>("all");
  const [id, setId] = useState(1);

  return (
    <AllTasksContext.Provider
      value={{ allTasks, setAllTasks, currentView, setCurrentView, id, setId }}
    >
      {children}
    </AllTasksContext.Provider>
  );
}

export default TasksProvider;

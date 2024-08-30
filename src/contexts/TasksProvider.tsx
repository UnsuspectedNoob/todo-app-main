import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "react";
import { TaskType, View } from "../types";

type TaskContextType = {
  allTasks: TaskType[] | null;
  setAllTasks: Dispatch<SetStateAction<TaskType[]>> | null;
  currentView: View;
  setCurrentView: Dispatch<SetStateAction<View>> | null;
  id: number;
  setId: Dispatch<SetStateAction<number>> | null;
};

export const AllTasksContext = createContext<TaskContextType>({
  allTasks: null,
  setAllTasks: null,
  currentView: "all",
  setCurrentView: null,
  id: 0,
  setId: null,
});

function TasksProvider({ children }: { children: ReactNode }) {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [currentView, setCurrentView] = useState<View>("all");
  const [id, setId] = useState(0);

  return (
    <AllTasksContext.Provider
      value={{ allTasks, setAllTasks, currentView, setCurrentView, id, setId }}
    >
      {children}
    </AllTasksContext.Provider>
  );
}

export default TasksProvider;

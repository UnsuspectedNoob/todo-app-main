import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "react";
import { TaskType, View } from "../types";

type TaskContextType = {
  allTasks: TaskType[];
  setAllTasks: Dispatch<SetStateAction<TaskType[]>>;
  currentView: View;
  setCurrentView: Dispatch<SetStateAction<View>>;
  id: number;
  setId: Dispatch<SetStateAction<number>>;
};

export const AllTasksContext = createContext<TaskContextType>({
  allTasks: [],
  setAllTasks: () => {},
  currentView: "all",
  setCurrentView: () => {},
  id: 0,
  setId: () => {},
});

function TasksProvider({ children }: { children: ReactNode }) {
  const [allTasks, setAllTasks] = useState<TaskType[]>([
    { completed: false, id: 1, name: "Empty Task" },
    { completed: false, id: 2, name: "Non-empty Task" },
    { completed: false, id: 3, name: "Learn HTML" },
  ]);
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

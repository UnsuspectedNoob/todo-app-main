import { useContext, useMemo } from "react";
import { AllTasksContext } from "../contexts/TasksProvider";
import Task from "./Task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function TaskList() {
  const { allTasks, setAllTasks, currentView } = useContext(AllTasksContext);

  const displayTasks = useMemo(() => {
    let tempArray = allTasks;
    if (currentView === "completed")
      tempArray = allTasks.filter((task) => task.completed);
    else if (currentView === "active")
      tempArray = allTasks.filter((task) => !task.completed);

    return tempArray;
  }, [allTasks, currentView]);

  const tasksId = useMemo(
    () => displayTasks.map((task) => task.id),
    [displayTasks]
  );

  return (
    <div>
      <SortableContext items={tasksId} strategy={verticalListSortingStrategy}>
        {displayTasks.map((task) => (
          <Task task={task} key={task.id} display={displayTasks} />
        ))}
      </SortableContext>

      <div
        className={`flex justify-between bg-light-body p-[18px] rounded-b-md text-[12px] ${
          displayTasks.length === 0 ? "rounded-t-md" : ""
        }`}
      >
        <p className="text-off">
          {(() => {
            let number = allTasks.filter((task) => !task.completed).length;

            return `${number} item${number === 1 ? "" : "s"} left`;
          })()}
        </p>

        <p
          onClick={() => {
            setAllTasks &&
              setAllTasks((prev) => prev.filter((task) => !task.completed));
          }}
          className="text-off cursor-pointer"
        >
          Clear Completed
        </p>
      </div>
    </div>
  );
}

export default TaskList;

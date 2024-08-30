import { useContext } from "react";
import { AllTasksContext } from "../contexts/TasksProvider";
import Task from "./Task";

function TaskList() {
  const { allTasks, setAllTasks, currentView } = useContext(AllTasksContext);

  return (
    <div>
      {allTasks &&
        (() => {
          let displayTasks = allTasks;
          if (currentView === "completed")
            displayTasks = allTasks.filter((task) => task.completed);
          else if (currentView === "active")
            displayTasks = allTasks.filter((task) => !task.completed);

          return displayTasks.map((task) => (
            <Task
              completed={task.completed}
              id={task.id}
              name={task.name}
              key={task.id}
            />
          ));
        })()}

      <div className="flex justify-between bg-white p-[18px] rounded-b-md text-[12px]">
        <p>
          {(() => {
            let number = allTasks?.filter((task) => !task.completed).length;

            return `${number} item${number === 1 ? "" : "s"} left`;
          })()}
        </p>

        <p
          onClick={() => {
            setAllTasks &&
              setAllTasks((prev) => prev.filter((task) => !task.completed));
          }}
        >
          Clear Completed
        </p>
      </div>
    </div>
  );
}

export default TaskList;

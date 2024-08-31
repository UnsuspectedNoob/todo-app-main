import { useContext } from "react";
import { iconCheck, iconCross } from "../assets/images";
import { AllTasksContext } from "../contexts/TasksProvider";
import { TaskType } from "../types";

interface Props {
  task: TaskType;
}

function Task({ task }: Props) {
  const { allTasks, setAllTasks } = useContext(AllTasksContext);
  const { name, id, completed } = task;

  return (
    <div className="flex items-center border-b border-b-neutral-500">
      <div
        className={`flex items-center bg-white py-4 pr-[14px] pl-5 ${
          allTasks[0].id === id ? "rounded-tl-md" : ""
        } text-gray-500 self-stretch`}
      >
        <div
          className={`flex items-center justify-center border rounded-full w-5 h-5 ${
            completed && "bg-gradient-to-b from-[#57ddff] to-[#c058f3]"
          }`}
          onClick={() => {
            setAllTasks &&
              setAllTasks((prev) =>
                prev.map((task) => ({
                  name: task.name,
                  completed: task.id === id ? !task.completed : task.completed,
                  id: task.id,
                }))
              );
          }}
        >
          {completed && <img src={iconCheck} />}
        </div>
      </div>
      <div
        className={`flex flex-1 items-center bg-white border-none self-stretch`}
      >
        <p
          className={`text-[12px] text-gray-700 ${
            completed && "line-through text-gray-300"
          }`}
        >
          {name}
        </p>
      </div>

      <div
        className={`flex items-center bg-white pr-5 self-stretch ${
          allTasks[0].id === id ? "rounded-tr-md" : ""
        }`}
      >
        <img
          src={iconCross}
          alt="cross icon"
          className="w-3 h-3"
          onClick={() => {
            setAllTasks &&
              setAllTasks((prev) => prev.filter((task) => task.id !== id));
          }}
        />
      </div>
    </div>
  );
}

export default Task;

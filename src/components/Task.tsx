import { useContext } from "react";
import { iconCheck, iconCross } from "../assets/images";
import { AllTasksContext } from "../contexts/TasksProvider";
import { TaskType } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: TaskType;
  display: TaskType[];
}

function Task({ task, display }: Props) {
  const { setAllTasks } = useContext(AllTasksContext);
  const { name, id, completed } = task;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { task } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center opacity-50 border-b border-b-neutral-500 touch-none"
      >
        <div
          className={`flex items-center bg-white py-4 pr-[14px] pl-5 text-gray-500 self-stretch`}
        >
          <div
            className={`flex items-center justify-center border rounded-full w-5 h-5 ${
              completed && "bg-gradient-to-b from-[#57ddff] to-[#c058f3]"
            }`}
            onClick={() => {
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

        <div className={`flex items-center bg-white pr-5 self-stretch`}>
          <img
            src={iconCross}
            alt="cross icon"
            className="w-3 h-3"
            onClick={() => {
              setAllTasks((prev) => prev.filter((task) => task.id !== id));
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center border-b border-b-circle-color touch-none"
    >
      <div
        className={`${
          display[0]?.id === id ? "rounded-tl-md " : ""
        }flex items-center py-4 pr-[14px] pl-5 text-gray-500 self-stretch bg-light-body `}
      >
        <div
          className={`cursor-pointer flex items-center justify-center border border-circle-color rounded-full w-5 h-5 ${
            completed && "bg-gradient-to-b from-[#57ddff] to-[#c058f3]"
          }`}
          onClick={() => {
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
        {...attributes}
        {...listeners}
        className={`bg-light-body flex flex-1 items-center border-none self-stretch cursor-move`}
      >
        <p
          className={`text-[12px] text-main ${
            completed && "line-through text-strike"
          }`}
        >
          {name}
        </p>
      </div>

      <div
        className={`${
          display[0]?.id === id ? "rounded-tr-md " : ""
        }cursor-pointer flex items-center bg-light-body  pr-5 self-stretch`}
      >
        <img
          src={iconCross}
          alt="cross icon"
          className="w-3 h-3"
          onClick={(event) => {
            event.stopPropagation();
            setAllTasks((prev) => prev.filter((task) => task.id !== id));
          }}
        />
      </div>
    </div>
  );
}

export default Task;

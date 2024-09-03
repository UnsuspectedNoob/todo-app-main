import { useContext, useState } from "react";
import {
  desktopDark,
  desktopLight,
  iconMoon,
  iconSun,
  mobileDark,
  mobileLight,
} from "./assets/images";
import { AllTasksContext } from "./contexts/TasksProvider";
import TaskList from "./components/TaskList";
import ToggleView from "./components/ToggleView";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { TaskType } from "./types";
import { createPortal } from "react-dom";
import Task from "./components/Task";

function App() {
  const { allTasks, setAllTasks, id, setId } = useContext(AllTasksContext);

  const [light, setLight] = useState(true); // light and dark themes
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  return (
    <div
      className={`bg-dark-body border-t w-screen min-h-screen font-josefin ${
        light ? "theme-light" : "theme-dark"
      }`}
    >
      {/* Absolute Image Header */}
      {light ? (
        <>
          <img
            src={mobileLight}
            alt="header image"
            className="z-10 absolute md:hidden w-full max-h-[270px] md:max-h-[300px] object-cover"
          />
          <img
            src={desktopLight}
            alt="header image"
            className="md:block z-10 absolute hidden w-full max-h-[270px] md:max-h-[300px] object-cover"
          />
        </>
      ) : (
        <>
          <img
            src={mobileDark}
            alt="header image"
            className="z-10 absolute md:hidden w-full max-h-[270px] md:max-h-[300px] object-cover"
          />
          <img
            src={desktopDark}
            alt="header image"
            className="md:block z-10 absolute hidden w-full max-h-[270px] md:max-h-[300px] object-cover"
          />
        </>
      )}

      {/* Main Body */}
      <div className="relative z-20 mx-auto px-6 md:px-0 pt-12 md:pt-20 max-w-[540px]">
        {/* Header */}
        <div className="flex justify-between">
          <a
            href="#"
            className="font-bold text-[27px] text-white md:text-[40px] leading-none tracking-[10px] md:tracking-[14px]"
          >
            TODO
          </a>

          {/* Theme Switcher */}
          <div className="hover:cursor-pointer" onClick={toggleTheme}>
            <img
              src={light ? iconMoon : iconSun}
              alt="Theme Switcher"
              className="w-5 md:w-[26px] h-5 md:h-[26px]"
            />
          </div>
        </div>

        <div className="space-y-4 mt-8">
          {/* Input Task */}
          <div className="flex items-center rounded-md">
            <div className="flex items-center bg-light-body py-[14px] pr-[14px] pl-5 rounded-l-md text-gray-500 self-stretch">
              <div className="border-circle-color border rounded-full w-5 h-5" />
            </div>
            <input
              onKeyDown={(event) => {
                if (event.key === "Enter" && event.currentTarget.value !== "") {
                  setAllTasks([
                    ...allTasks,
                    {
                      name: event.currentTarget.value,
                      completed: false,
                      id: id,
                    },
                  ]);
                  console.log(event.currentTarget.value);
                  setId((prev) => prev + 1);
                  event.currentTarget.value = "";
                }
              }}
              type="text"
              placeholder="Create a new todo..."
              className="flex-1 bg-light-body border-none rounded-r-md focus:ring-0 text-main text-xs placeholder:text-off focus:outline-none self-stretch"
            />
          </div>

          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            collisionDetection={closestCorners}
          >
            {/* List of tasks */}
            <TaskList />

            {createPortal(
              <DragOverlay>
                {activeTask && <Task task={activeTask} display={[]} />}
              </DragOverlay>,
              document.body
            )}
          </DndContext>

          <ToggleView />
        </div>
      </div>

      <p className="mt-11 text-[14px] text-center text-off">
        Drag and drop to reorder list
      </p>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current) {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id;
    const overTaskId = over.id;

    if (activeTaskId === overTaskId) return;

    setAllTasks((tasks) => {
      const activeIndex = getIndex(tasks, activeTaskId);
      const overIndex = getIndex(tasks, overTaskId);

      return arrayMove(tasks, activeIndex, overIndex);
    });
  }

  function getIndex(array: TaskType[], id: UniqueIdentifier) {
    return array.findIndex((task) => task.id === id);
  }

  function toggleTheme() {
    setLight((prev) => !prev);
  }
}

export default App;

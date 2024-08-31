import { useContext, useEffect } from "react";
import { iconMoon, mobileLight } from "./assets/images";
import { AllTasksContext } from "./contexts/TasksProvider";
import TaskList from "./components/TaskList";
import ToggleView from "./components/ToggleView";

function App() {
  const { allTasks, setAllTasks, id, setId } = useContext(AllTasksContext);

  useEffect(() => {
    console.log(allTasks);
  }, [allTasks]);

  return (
    <div className="bg-neutral-100 border-t w-screen min-h-screen font-josefin">
      {/* Absolute Image Header */}
      <img
        src={mobileLight}
        alt="header image"
        className="z-10 absolute w-full max-h-[270px] object-cover"
      />

      {/* Main Body */}
      <div className="relative z-20 px-6 pt-12">
        {/* Header */}
        <div className="flex justify-between">
          <a
            href="#"
            className="font-bold text-[27px] text-white leading-none tracking-[10px]"
          >
            TODO
          </a>
          <div>
            <img src={iconMoon} alt="Theme Switcher" className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-4 mt-8">
          {/* Input Task */}
          <div className="flex items-center rounded-md">
            <div className="flex items-center bg-white py-[14px] pr-[14px] pl-5 rounded-l-md text-gray-500 self-stretch">
              <div className="border rounded-full w-5 h-5" />
            </div>
            <input
              onKeyDown={(event) => {
                if (event.key === "Enter" && event.currentTarget.value !== "") {
                  setAllTasks &&
                    allTasks &&
                    setAllTasks([
                      ...allTasks,
                      {
                        name: event.currentTarget.value,
                        completed: false,
                        id: id,
                      },
                    ]);
                  console.log(event.currentTarget.value);
                  setId && setId((prev) => prev + 1);
                  event.currentTarget.value = "";
                  // event.currentTarget.blur();
                }
              }}
              type="text"
              placeholder="Create a new todo..."
              className="flex-1 bg-white border-none rounded-r-md focus:ring-0 text-gray-700 focus:outline-none text-xs self-stretch"
            />
          </div>

          {/* List of tasks */}
          <TaskList />

          <ToggleView />
        </div>
      </div>

      <p className="mt-11 text-[14px] text-center">
        Drag and drop to reorder list
      </p>
    </div>
  );
}

export default App;

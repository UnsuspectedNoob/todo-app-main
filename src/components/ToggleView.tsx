import { useContext } from "react";
import { AllTasksContext } from "../contexts/TasksProvider";

function ToggleView() {
  const { currentView, setCurrentView } = useContext(AllTasksContext);

  return (
    <div className="flex justify-center items-center gap-x-[18px] bg-light-body py-[14px] rounded-md font-bold text-[14px]">
      <p
        className={`${
          currentView === "all" ? "text-[#3a7bfd]" : "text-off"
        } cursor-pointer`}
        onClick={() => setCurrentView && setCurrentView("all")}
      >
        All
      </p>
      <p
        className={`${
          currentView === "active" ? "text-[#3a7bfd]" : "text-off"
        } cursor-pointer`}
        onClick={() => setCurrentView && setCurrentView("active")}
      >
        Active
      </p>
      <p
        className={`${
          currentView === "completed" ? "text-[#3a7bfd]" : "text-off"
        } cursor-pointer`}
        onClick={() => setCurrentView && setCurrentView("completed")}
      >
        Completed
      </p>
    </div>
  );
}

export default ToggleView;

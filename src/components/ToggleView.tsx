import ViewButtons from "./ViewButtons";

function ToggleView() {
  return (
    <div className="md:hidden bg-light-body py-[14px] rounded-md font-bold text-[14px]">
      <ViewButtons />
    </div>
  );
}

export default ToggleView;

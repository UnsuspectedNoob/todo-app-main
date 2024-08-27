import { mobileLight } from "./assets/images";

function App() {
  return (
    <div className="font-josefin">
      {/* Absolute Image Header */}
      <div className="top-0 left-0 absolute border border-red-500 w-full max-h-[270px]">
        <img src={mobileLight} alt="image header" className="object-cover" />
      </div>
    </div>
  );
}

export default App;

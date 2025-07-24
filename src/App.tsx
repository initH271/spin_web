import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpinPlate from "./components/SpinPlate";
import ActionButtons from "./components/ActionButtons";

function App() {
  return (
    <div className="relative w-full min-h-[812px] bg-gradient-to-r from-[#FF5EA7] from-26% via-[#C85AFF] via-61% to-[#5A74FF] to-98% flex flex-col">
      {/* header */}
      <Header />
      {/* content */}
      <div className="flex-1 flex flex-col items-start justify-start">
        {/* hero title */}
        <HeroSection />

        {/* spin plate */}
        <SpinPlate />

        {/* action button */}
        <ActionButtons />
      </div>
    </div>
  );
}

export default App;

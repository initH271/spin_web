import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpinPlate from "./components/SpinPlate";
import ActionButtons from "./components/ActionButtons";

function App() {
  return (
    <div className="relative w-full min-h-[calc(375/812*100vw)] bg-gradient-mobile flex flex-col md:h-[calc(1080/1920*100vw)]">
      {/* header */}
      <Header />
      {/* content */}
      <div className="flex-1 flex flex-col items-center justify-start w-full">
        <div className="flex-1 flex flex-col items-center justify-start w-[calc(375/375*100vw)] pt-[calc(48/375*100vw)] md:flex-row md:w-full md:items-start md:justify-center md:gap-[calc(124/1920*100vw)] md:pt-[calc(36/1920*100vw)]">
          {/* hero title */}
          <HeroSection />

          {/* spin plate */}
          <SpinPlate />

          {/* action button */}
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}

export default App;

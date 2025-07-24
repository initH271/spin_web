import logo from "./assets/svg/logo.svg";
import spinPlate from "./assets/images/spin_plate.png";
import spinPointer from "./assets/images/spin_pointer.png";
import spinPlateBase from "./assets/images/plate_base.png";
import iconPlate from "./assets/svg/icon_plate.svg";
import iconMulti from "./assets/svg/icon_multi.svg";

function App() {


  


  return (
    <div className="relative w-full min-h-[812px] bg-gradient-to-r from-[#FF5EA7] from-26% via-[#C85AFF] via-61% to-[#5A74FF] to-98% flex flex-col">
      {/* header */}
      <div className="absolute top-0 left-0 w-full h-[60px] bg-[rgba(39,11,79,0.05)] flex items-center justify-between px-[24px]">
        {/* logo */}
        <img src={logo} alt="logo" className="min-w-[173.42px] min-h-[24px]" />
        {/* login / sign up */}
        <div className="flex flex-row items-center justify-center px-4 py-2 gap-1  w-[125px] h-[31px] bg-white shadow-[0_0_12px_rgba(39,11,79,0.1),0_8px_5px_rgba(39,11,79,0.08),0_2px_2px_rgba(39,11,79,0.04)] rounded-[50px]">
          <span className=" h-[15px] font-['Montserrat'] font-normal font-400 text-xs leading-[15px] text-black flex-none order-0 grow-0">
            Login / Sign Up
          </span>
        </div>
      </div>
      {/* content */}
      <div className="flex-1 flex flex-col items-start justify-start">
        {/* hero title */}
        <div className="flex flex-col shrink-0 items-start justify-start gap-[16px] px-[35px] pt-[108px] *:font-['Montserrat_Alternates']">
          <span className="h-[29px]  font-black text-2xl leading-[29px] tracking-[-0.04em] text-white text-shadow-glow">
            Headline copy materials
          </span>
          <span className="h-[29px] font-black text-2xl leading-[29px] tracking-[-0.04em] text-white text-shadow-glow">
            Headline copy
          </span>
          <span className="w-[297px] h-[17px] font-normal text-[14px] leading-[17px] tracking-[-0.04em] text-white [text-shadow:0px_4px_7.2px_rgba(255,255,255,0.2),0px_6px_11.7px_rgba(168,81,255,0.1)]">
            Headline copy Headline copy Headline copy
          </span>
        </div>

        {/* spin plate */}
        <div className="flex flex-col items-start justify-start w-full h-[361px] mt-[47px] px-[24px] *:font-['Montserrat_Alternates'] relative">
          <div className="absolute bottom-0 w-[327px] h-[108px]">
            <img src={spinPlateBase} alt="spin plate base" className="w-full h-full" />
          </div>
          <div className="mx-auto size-[323.64px] flex flex-col items-center justify-center relative">
            <img src={spinPlate} alt="spin plate" className="absolute inset-0" />
            <canvas
              id="spin-plate"
              className="size-[290px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <img src={spinPointer} alt="spin pointer" className="size-[150px] z-10" />
          </div>
        </div>

        {/* action button */}
        <div className="flex flex-col items-start justify-start gap-[16px] w-full h-[100px] mt-[24px] px-[24px] **:font-['Montserrat_Alternates'] relative">
          <div className="flex flex-row justify-center items-center gap-[3px] w-[327px] h-[42px] bg-white rounded-[30px] flex-none order-0 grow-0">
            <img src={iconPlate} alt="icon plate" className="size-[20px]" />
            <img src={iconMulti} alt="icon multi" className="size-[8px]" />
            <span className="h-[15px] font-['Montserrat'] font-normal font-400 text-xs leading-[15px] text-black flex-none order-0 grow-0">
              3
            </span>
          </div>
          <div className="flex flex-row justify-center items-center p-4 px-8 gap-[4px] w-[327px] h-[42px] bg-[#270B4F] rounded-[50px] flex-none order-1 grow-0">
            <div className="w-[66px] h-[17px] font-['Montserrat'] font-normal text-[14px] leading-[17px] text-white flex-none order-0 grow-0">
              My Prizes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

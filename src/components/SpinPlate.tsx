import spinPlate from "../assets/images/spin_plate.png";
import spinPointer from "../assets/images/spin_pointer.png";
import spinPlateBase from "../assets/images/plate_base.png";

const SpinPlate = () => {
  return (
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
  );
};

export default SpinPlate; 
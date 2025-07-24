import iconPlate from "../assets/svg/icon_plate.svg";
import iconMulti from "../assets/svg/icon_multi.svg";

const ActionButtons = () => {
  return (
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
  );
};

export default ActionButtons; 
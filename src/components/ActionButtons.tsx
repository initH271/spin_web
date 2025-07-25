import iconPlate from "../assets/svg/icon_plate.svg";
import iconMulti from "../assets/svg/icon_multi.svg";

const ActionButtons = ({ onMyPrizes }: { onMyPrizes: () => void }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-[calc(16/375*100vw)] w-full h-[calc(100/375*100vw)] mt-[calc(24/375*100vw)] mb-[calc(56/375*100vw)] px-[calc(24/375*100vw)] **:font-['Montserrat_Alternates'] relative md:hidden">
      <div className="flex flex-row justify-center items-center gap-[calc(3/375*100vw)] w-[calc(327/375*100vw)] h-[calc(42/375*100vw)] bg-white rounded-[30px] flex-none order-0 grow-0">
        <img src={iconPlate} alt="icon plate" className="size-[calc(20/375*100vw)]" />
        <img src={iconMulti} alt="icon multi" className="size-[calc(8/375*100vw)]" />
        <span className="h-[calc(15/375*100vw)] font-normal text-[calc(16/375*100vw)] leading-[calc(15/375*100vw)] text-black flex-none order-0 grow-0">
          3
        </span>
      </div>
      <div
        className="flex flex-row justify-center items-center p-[calc(4/375*100vw)] px-[calc(8/375*100vw)] gap-[calc(4/375*100vw)] w-[calc(327/375*100vw)] h-[calc(42/375*100vw)] bg-[#270B4F] rounded-[50px] flex-none order-1 grow-0"
        onClick={onMyPrizes}>
        <div className=" h-[calc(17/375*100vw)] font-normal text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] text-white flex-none order-0 grow-0">
          My Prizes
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;

import { useState } from "react";
import iconClose from "../../assets/svg/icon_close.svg";

interface MyPrizesModalProps {
  isOpen: boolean;
  onClaim: () => void;
  onClose: () => void;
}

export default function MyPrizesModal({ isOpen, onClose, onClaim }: MyPrizesModalProps) {
  if (!isOpen) return null;

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
        <div className="bg-white p-[calc(24/375*100vw)] rounded-lg w-[calc(314/375*100vw)] max-h-[calc(612/375*100vw)] flex flex-col items-center justify-start gap-[calc(24/375*100vw)] relative">
          {/* close button */}
          <div className="absolute -top-[calc(24/375*100vw)] -right-[calc(24/375*100vw)]">
            <img
              src={iconClose}
              alt="close"
              className="w-[calc(24/375*100vw)] h-[calc(24/375*100vw)]"
              onClick={onClose}
            />
          </div>
          {/* my prizes title */}
          <div className="flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(48/375*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
            <div
              className={`flex flex-row justify-center items-center py-[calc(6/375*100vw)] px-[calc(16/375*100vw)] gap-[calc(10/375*100vw)] w-[calc(124/375*100vw)] h-[calc(36/375*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
              <div
                className={`h-[calc(24/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
                My Prizes
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start gap-[calc(16/375*100vw)] w-[calc(266/375*100vw)] overflow-y-auto scroll-bar-hidden">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
              <div className="w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[#270B4F]/5 rounded-[calc(21/375*100vw)] flex-none order-0 grow z-0 relative">
                <div className="flex items-center justify-start px-[calc(21/375*100vw)] w-[calc(190/375*100vw)] h-[calc(42/375*100vw)]">
                  {item}
                </div>

                <div
                  className="flex flex-row justify-center items-center p-0 gap-[4px] absolute w-[calc(76/375*100vw)] h-[calc(42/375*100vw)] right-0 top-0 bg-[#270B4F] rounded-[calc(21/375*100vw)] text-white flex-none order-1 grow-0"
                  onClick={onClaim}>
                  <div className="w-[calc(48/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-extrabold text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] uppercase text-white flex-none order-0 grow-0">
                    Claim
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
      <div className="bg-white p-[calc(24/1920*100vw)] rounded-lg w-[calc(314/1920*100vw)] max-h-[calc(612/1920*100vw)] flex flex-col items-center justify-start gap-[calc(24/1920*100vw)] relative">
        {/* close button */}
        <div className="absolute -top-[calc(24/1920*100vw)] -right-[calc(24/1920*100vw)]">
          <img
            src={iconClose}
            alt="close"
            className="w-[calc(24/1920*100vw)] h-[calc(24/1920*100vw)]"
            onClick={onClose}
          />
        </div>
        {/* my prizes title */}
        <div className="flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(48/1920*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
          <div
            className={`flex flex-row justify-center items-center py-[calc(6/1920*100vw)] px-[calc(16/1920*100vw)] gap-[calc(10/1920*100vw)] w-[calc(124/1920*100vw)] h-[calc(36/1920*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
            <div
              className={`h-[calc(24/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
              My Prizes
            </div>
          </div>
        </div>
  
        <div className="flex flex-col items-center justify-start gap-[calc(16/1920*100vw)] w-[calc(266/1920*100vw)] overflow-y-auto scroll-bar-hidden">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
            <div className="w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[#270B4F]/5 rounded-[calc(21/1920*100vw)] flex-none order-0 grow z-0 relative">
              <div className="flex items-center justify-start px-[calc(21/1920*100vw)] w-[calc(190/1920*100vw)] h-[calc(42/1920*100vw)]">
                {item}
              </div>
  
              <div
                className="flex flex-row justify-center items-center p-0 gap-[4px] absolute w-[calc(76/1920*100vw)] h-[calc(42/1920*100vw)] right-0 top-0 bg-[#270B4F] rounded-[calc(21/1920*100vw)] text-white flex-none order-1 grow-0"
                onClick={onClaim}>
                <div className="w-[calc(48/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-extrabold text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] uppercase text-white flex-none order-0 grow-0">
                  Claim
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

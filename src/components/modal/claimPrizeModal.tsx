import iconClose from "../../assets/svg/icon_close.svg";

interface ClaimPrizeModalProps {
  isOpen: boolean;
  onClaim?: () => void;
  onClose: () => void;
}

export default function ClaimPrizeModal({ isOpen, onClose, onClaim }: ClaimPrizeModalProps) {
  if (!isOpen) return null;

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100 overflow-y-auto scroll-bar-hidden">
        <div className="bg-white p-[calc(24/375*100vw)] rounded-lg w-[calc(314/375*100vw)] h-[calc(595/375*100vw)] flex flex-col items-center justify-start gap-[calc(24/375*100vw)] relative">
          {/* close button */}
          <div className="absolute -top-[calc(24/375*100vw)] -right-[calc(24/375*100vw)]">
            <img
              src={iconClose}
              alt="close"
              className="w-[calc(24/375*100vw)] h-[calc(24/375*100vw)]"
              onClick={onClose}
            />
          </div>
          {/* message title */}
          <div className="flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(48/375*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
            <div
              className={`flex flex-row justify-center items-center py-[calc(6/375*100vw)] px-[calc(16/375*100vw)] gap-[calc(10/375*100vw)] w-[calc(124/375*100vw)] h-[calc(36/375*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
              <div
                className={`h-[calc(24/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
                Claim Your Prize
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start gap-[calc(16/375*100vw)] w-[calc(266/375*100vw)] h-[calc(393/375*100vw)]">
            {/* full name */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
              <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                Full Name
                <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Name is required)</span>
              </div>
              <input
                type="text"
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
            {/* phone number */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
              <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                Phone Number
                <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Invalid phone format)</span>
              </div>
              <input
                type="text"
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
            {/* country */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
              <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                Country
                <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Country is required)</span>
              </div>
              <input
                type="text"
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
            {/* street address */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
              <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                Street Address
                <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Street address is required)</span>
              </div>
              <input
                type="text"
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
            {/* city */}
            <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
              <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                City
                <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(City is required)</span>
              </div>
              <input
                type="text"
                className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(58/375*100vw)]">
            <div
              className="box-border flex flex-row justify-center items-center w-[calc(266/375*100vw)] h-[calc(58/375*100vw)] bg-[#270B4F] [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)] rounded-[calc(100/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-white flex-none order-0 grow-0 uppercase"
              onClick={onClaim}>
              <div className="w-[calc(109/375*100vw)] h-[calc(20/375*100vw)] font-['Montserrat'] font-extrabold text-[calc(16/375*100vw)] leading-[calc(20/375*100vw)] text-center tracking-[-0.01em] uppercase text-white flex-none order-0 grow-0">
                Claim Prize
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100 overflow-y-auto scroll-bar-hidden">
      <div className="bg-white p-[calc(24/1920*100vw)] rounded-lg w-[calc(314/1920*100vw)] h-[calc(595/1920*100vw)] flex flex-col items-center justify-start gap-[calc(24/1920*100vw)] relative">
        {/* close button */}
        <div className="absolute -top-[calc(24/1920*100vw)] -right-[calc(24/1920*100vw)]">
          <img
            src={iconClose}
            alt="close"
            className="w-[calc(24/1920*100vw)] h-[calc(24/1920*100vw)]"
            onClick={onClose}
          />
        </div>
        {/* message title */}
        <div className="flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(48/1920*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
          <div
            className={`flex flex-row justify-center items-center py-[calc(6/1920*100vw)] px-[calc(16/1920*100vw)] gap-[calc(10/1920*100vw)] w-[calc(124/1920*100vw)] h-[calc(36/1920*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
            <div
              className={`h-[calc(24/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
              Claim Your Prize
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start gap-[calc(16/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(393/1920*100vw)]">
          {/* full name */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              Full Name
              <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Name is required)</span>
            </div>
            <input
              type="text"
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
          {/* phone number */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              Phone Number
              <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Invalid phone format)</span>
            </div>
            <input
              type="text"
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
          {/* country */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              Country
              <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Country is required)</span>
            </div>
            <input
              type="text"
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
          {/* street address */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              Street Address
              <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Street address is required)</span>
            </div>
            <input
              type="text"
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
          {/* city */}
          <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
            <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
              City
              <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(City is required)</span>
            </div>
            <input
              type="text"
              className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(58/1920*100vw)]">
          <div
            className="box-border flex flex-row justify-center items-center w-[calc(266/1920*100vw)] h-[calc(58/1920*100vw)] bg-[#270B4F] [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)] rounded-[calc(100/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-white flex-none order-0 grow-0 uppercase"
            onClick={onClaim}>
            <div className="w-[calc(109/1920*100vw)] h-[calc(20/1920*100vw)] font-['Montserrat'] font-extrabold text-[calc(16/1920*100vw)] leading-[calc(20/1920*100vw)] text-center tracking-[-0.01em] uppercase text-white flex-none order-0 grow-0">
              Claim Prize
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

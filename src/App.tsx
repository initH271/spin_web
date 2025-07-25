import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpinPlate from "./components/SpinPlate";
import ActionButtons from "./components/ActionButtons";
import AuthModal from "./components/modal/authModal";
import { useState } from "react";
import MyPrizesModal from "./components/modal/myPrizesModal";
import MessageModal from "./components/modal/messageModal";
import ClaimPrizeModal from "./components/modal/claimPrizeModal";
import ClaimTokenPrizeModal from "./components/modal/claimTokenPrize";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyPrizesModalOpen, setIsMyPrizesModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isClaimPrizeModalOpen, setIsClaimPrizeModalOpen] = useState(true);
  const [isClaimTokenPrizeModalOpen, setIsClaimTokenPrizeModalOpen] = useState(false);
  return (
    <div className="relative w-full min-h-[calc(375/812*100vw)] bg-gradient-mobile flex flex-col md:h-[calc(1080/1920*100vw)]">
      {/* header */}
      <Header onLogin={() => setIsAuthModalOpen(true)} onMyPrizes={() => setIsMyPrizesModalOpen(true)} />
      {/* content */}
      <div className="flex-1 flex flex-col items-center justify-start w-full">
        <div className="flex-1 flex flex-col items-center justify-start w-[calc(375/375*100vw)] pt-[calc(48/375*100vw)] md:flex-row md:w-full md:items-start md:justify-between md:gap-[calc(124/1920*100vw)] md:pt-[calc(36/1920*100vw)]">
          {/* hero title */}
          <HeroSection />

          {/* spin plate */}
          <SpinPlate />

          {/* action button */}
          <ActionButtons onMyPrizes={() => setIsMyPrizesModalOpen(true)} />
        </div>
      </div>

      {/* login/signup modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={() => {}}
        onSignup={() => {}}
        onResetPass={() => {}}
      />

      {/* my prizes modal */}
      <MyPrizesModal isOpen={isMyPrizesModalOpen} onClose={() => setIsMyPrizesModalOpen(false)} onClaim={() => {}} />

      {/* message modal */}
      <MessageModal
        isOpen={isMessageModalOpen}
        messageType="Opps"
        message="You missed the prize.
Try again!"
        onClose={() => setIsMessageModalOpen(false)}
        onClaim={() => {}}
        onCollect={() => {}}
      />

      {/* claim prize modal */}
      <ClaimPrizeModal
        isOpen={isClaimPrizeModalOpen}
        onClose={() => setIsClaimPrizeModalOpen(false)}
        onClaim={() => {}}
      />

      {/* claim token prize modal */}
      <ClaimTokenPrizeModal
        isOpen={isClaimTokenPrizeModalOpen}
        onClose={() => setIsClaimTokenPrizeModalOpen(false)}
        onClaim={() => {}}
      />
    </div>
  );
}

export default App;

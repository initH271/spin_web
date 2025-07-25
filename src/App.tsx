import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpinPlate from "./components/SpinPlate";
import ActionButtons from "./components/ActionButtons";
import AuthModal from "./components/modal/authModal";
import { useState, useEffect } from "react";
import MyPrizesModal from "./components/modal/myPrizesModal";
import MessageModal from "./components/modal/messageModal";
import ClaimPrizeModal from "./components/modal/claimPrizeModal";
import ClaimTokenPrizeModal from "./components/modal/claimTokenPrize";
import { useUserStore } from "./store";
import { useHomepage } from "./hooks/useHomepage";
import { useWheelRoute } from "./hooks/useWheelRoute";
import { Toaster } from "sonner";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyPrizesModalOpen, setIsMyPrizesModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isClaimPrizeModalOpen, setIsClaimPrizeModalOpen] = useState(false);
  const [isClaimTokenPrizeModalOpen, setIsClaimTokenPrizeModalOpen] = useState(false);
  const { isLoggedIn } = useUserStore();

  // 使用自定义hook解析路由中的转盘信息
  const { wheelSlug, isWheelPagePath } = useWheelRoute();

  // 使用首页hook
  const { homepageData } = useHomepage(wheelSlug);

  // 使用动态背景图片，如果没有则使用默认渐变
  const backgroundImage = homepageData?.style?.background_image;

  // 自动弹出登录弹窗逻辑
  useEffect(() => {
    if (isWheelPagePath && !isLoggedIn && !isAuthModalOpen) {
      // 延迟一点时间，确保页面加载完成后再弹出
      const timer = setTimeout(() => {
        setIsAuthModalOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isWheelPagePath, isLoggedIn, isAuthModalOpen]);

  const handleLogin = () => {
    // 登录成功后的逻辑
  };

  const handleSignup = () => {
    // 注册成功后的逻辑
  };

  const handleResetPass = () => {
    // 密码重置成功后的逻辑
  };

  const handleMyPrizes = () => {
    if (isLoggedIn) {
      setIsMyPrizesModalOpen(true);
      // 这里可以添加查看奖品的逻辑
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div
      className={`relative w-full min-h-[calc(375/812*100vw)] flex flex-col md:min-h-[calc(1080/1920*100vw)] ${
        backgroundImage ? "" : "bg-gradient-mobile"
      }`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }>
      {/* header */}
      <Header onLogin={() => setIsAuthModalOpen(true)} onMyPrizes={handleMyPrizes} />
      {/* content */}
      <div className="flex-1 flex flex-col items-center justify-start w-full">
        <div className="flex-1 flex flex-col items-center justify-start w-[calc(375/375*100vw)] pt-[calc(48/375*100vw)] md:flex-row md:w-full md:items-start md:justify-between md:gap-[calc(124/1920*100vw)] md:pt-[calc(36/1920*100vw)]">
          {/* hero title */}
          <HeroSection />

          {/* spin plate */}
          <SpinPlate prizes={homepageData?.prizes} wheelInstanceId={homepageData?.wheel_instance?.id} />

          {/* action button */}
          <ActionButtons onMyPrizes={handleMyPrizes} />
        </div>
      </div>

      {/* login/signup modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onResetPass={handleResetPass}
      />

      {/* my prizes modal */}
      <MyPrizesModal isOpen={isMyPrizesModalOpen} onClose={() => setIsMyPrizesModalOpen(false)} onClaim={() => {}} />

      {/* message modal */}
      <MessageModal
        isOpen={isMessageModalOpen}
        messageType="Oops"
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

      {/* Toaster for notifications */}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;

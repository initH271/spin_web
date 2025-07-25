import logo from "../assets/svg/logo.svg";
import iconPlate from "../assets/svg/icon_plate.svg";
import iconMulti from "../assets/svg/icon_multi.svg";
import iconLogout from "../assets/svg/icon_logout.svg";
import { useUserStore } from "../store";
import { useHomepageStore } from "../store";

interface HeaderProps {
  onLogin: () => void;
  onMyPrizes: () => void;
}

const Header = ({ onLogin, onMyPrizes }: HeaderProps) => {
  const { user, isLoggedIn, logout } = useUserStore();
  const { spinStatus } = useHomepageStore();
  
  // 获取剩余转盘次数
  const remainingSpins = spinStatus?.remaining_count || 0;
  return (
    <div className="w-full h-[calc(60/375*100vw)] bg-[rgba(39,11,79,0.05)] flex items-center justify-between px-[calc(24/375*100vw)] md:min-h-[calc(120/1920*100vw)] md:px-[calc(240/1920*100vw)]">
      {/* logo */}
      <img
        src={logo}
        alt="logo"
        className="w-[calc(173.42/375*100vw)] h-[calc(24/375*100vw)] md:w-[calc(424/1920*100vw)] md:h-[calc(58/1920*100vw)]"
      />
      {/* login / sign up */}
      <div className="w-[calc(125/375*100vw)] h-[calc(31/375*100vw)] flex flex-row items-center justify-center gap-[calc(12/375*100vw)] md:min-w-[calc(525/1920*100vw)] md:h-[calc(58/1920*100vw)] md:flex md:justify-end md:items-center md:gap-[calc(48/1920*100vw)]">
        {/* 游戏次数 */}
        <div className="hidden md:flex flex-row justify-center items-center gap-[6px] md:min-w-[calc(87/1920*100vw)] md:h-[calc(58/1920*100vw)]">
          <img src={iconPlate} alt="icon plate" className="md:size-[calc(40/1920*100vw)]" />
          <img src={iconMulti} alt="icon multi" className="md:size-[calc(16/1920*100vw)]" />
          <span className="font-['Montserrat'] font-normal font-400 text-white md:font-[calc(32/1920*100vw)] md:leading-[calc(16/1920*100vw)] md:w-[calc(123/1920*100vw)] md:h-[calc(20/1920*100vw)] md:text-[calc(32/1920*100vw)]">
            {remainingSpins}
          </span>
        </div>

        {/* my prizes */}
        <div
          className="hidden md:flex flex-row justify-center items-center bg-[#270B4F] rounded-[100px] md:w-[calc(171/1920*100vw)] md:h-[calc(58/1920*100vw)]"
          onClick={onMyPrizes}>
          <span className="flex items-center justify-center h-[15px] font-['Montserrat'] font-normal font-400 text-xs leading-[15px] text-white flex-none order-0 grow-0 md:font-[calc(16/1920*100vw)] md:leading-[calc(16/1920*100vw)] md:w-[calc(123/1920*100vw)] md:h-[calc(20/1920*100vw)] md:text-[calc(16/1920*100vw)]">
            My Prizes
          </span>
        </div>

        {/* 登录/注册按钮 */}
        <div className="flex flex-row items-center justify-center px-[calc(4/375*100vw)] py-[calc(2/375*100vw)] gap-[calc(1/375*100vw)] w-[calc(125/375*100vw)] h-[calc(31/375*100vw)] bg-white shadow-[0_0_12px_rgba(39,11,79,0.1),0_8px_5px_rgba(39,11,79,0.08),0_2px_2px_rgba(39,11,79,0.04)] rounded-[50px] md:w-[calc(171/1920*100vw)] md:h-[calc(58/1920*100vw)] md:gap-[calc(4/1920*100vw)]">
          <span
            className="flex items-center justify-center h-[calc(15/375*100vw)] font-['Montserrat'] font-normal font-400 text-[calc(12/375*100vw)] leading-[calc(15/375*100vw)] text-black flex-none order-0 grow-0 md:font-[calc(16/1920*100vw)] md:leading-[calc(16/1920*100vw)] md:w-[calc(123/1920*100vw)] md:h-[calc(20/1920*100vw)] md:text-[calc(16/1920*100vw)]"
            onClick={isLoggedIn ? logout : onLogin}>
            {isLoggedIn ? user?.email.slice(0, 11) + '...' : 'Login / Sign Up'}
            {isLoggedIn ? <img src={iconLogout} alt="icon user" className="size-[calc(12/375*100vw)] md:size-[calc(24/1920*100vw)]" /> : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;

import logo from "../assets/svg/logo.svg";

const Header = () => {
  return (
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
  );
};

export default Header; 
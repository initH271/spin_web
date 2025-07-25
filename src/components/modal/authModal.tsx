import { useState } from "react";
import iconClose from "../../assets/svg/icon_close.svg";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onResetPass: () => void;
}

export default function AuthModal({ isOpen, onClose, onLogin, onSignup, onResetPass }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPass, setIsResetPass] = useState(false);

  if (!isOpen) return null;

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
        <div className="bg-white p-[calc(24/375*100vw)] rounded-lg w-[calc(314/375*100vw)] flex flex-col items-center justify-start gap-[calc(24/375*100vw)] relative">
          <div className="absolute -top-[calc(24/375*100vw)] -right-[calc(24/375*100vw)]">
            <img
              src={iconClose}
              alt="close"
              className="w-[calc(24/375*100vw)] h-[calc(24/375*100vw)]"
              onClick={onClose}
            />
          </div>

          {/* login/signup button */}
          {!isResetPass && (
            <div className="flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(48/375*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
              <div
                className={`flex flex-row justify-center items-center py-[calc(6/375*100vw)] px-[calc(16/375*100vw)] gap-[calc(10/375*100vw)] w-[calc(124/375*100vw)] h-[calc(36/375*100vw)] rounded-[100px] flex-none order-0 grow`}
                style={{
                  backgroundColor: isLogin ? "white" : "",
                }}
                onClick={() => setIsLogin(true)}>
                <div
                  className={`w-[calc(59/375*100vw)] h-[calc(24/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}
                  style={{
                    opacity: isLogin ? 1 : 0.5,
                  }}>
                  Login
                </div>
              </div>
              <div
                className={`flex flex-row justify-center items-center py-[calc(6/375*100vw)] px-[calc(16/375*100vw)] gap-[calc(10/375*100vw)] w-[calc(124/375*100vw)] h-[calc(36/375*100vw)] rounded-[100px] flex-none order-1 grow`}
                style={{
                  backgroundColor: !isLogin ? "white" : "",
                }}
                onClick={() => setIsLogin(false)}>
                <div
                  className={`w-[calc(81/375*100vw)] h-[calc(24/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-black opacity-50 flex-none order-0 grow-0 flex items-center justify-center`}
                  style={{
                    opacity: !isLogin ? 1 : 0.5,
                  }}>
                  Sign Up
                </div>
              </div>
            </div>
          )}
          {isResetPass && (
            <div className="flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(48/375*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
              <div
                className={`flex flex-row justify-center items-center py-[calc(6/375*100vw)] px-[calc(16/375*100vw)] gap-[calc(10/375*100vw)] w-[calc(124/375*100vw)] h-[calc(36/375*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
                <div
                  className={`h-[calc(24/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
                  Reset Password
                </div>
              </div>
            </div>
          )}

          {/* login/signup form */}
          {isLogin && (
            <div className="flex flex-col items-center justify-start gap-[calc(16/375*100vw)] w-[calc(266/375*100vw)] h-[calc(161/375*100vw)]">
              {/* email input */}
              <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
                <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                  Email
                  <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Account not found)</span>
                </div>
                <input
                  type="email"
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                />
              </div>
              {/* password input */}
              <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(82/375*100vw)] gap-[calc(4/375*100vw)]">
                <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                  Password
                  <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Incorrect password)</span>
                </div>
                <input
                  type="password"
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                />
                <div
                  className="w-[calc(266/375*100vw)] h-[calc(15/375*100vw)] font-['Montserrat'] font-light text-[calc(12/375*100vw)] leading-[calc(15/375*100vw)] tracking-[-0.01em] text-black flex-none order-2 grow-0 flex items-center justify-end gap-[calc(4/375*100vw)]"
                  onClick={() => {
                    setIsResetPass(true);
                    setIsLogin(false);
                  }}>
                  <span className="text-[#270B4F] text-[calc(12/375*100vw)] underline">Forgot password?</span>
                </div>
              </div>
            </div>
          )}
          {(!isLogin || isResetPass) && (
            <div className="flex flex-col items-center justify-start gap-[calc(16/375*100vw)] w-[calc(266/375*100vw)] h-[calc(240/375*100vw)]">
              {/* email input */}
              <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
                <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                  Email
                  <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Account not found)</span>
                </div>
                <input
                  type="email"
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                />
              </div>
              {/* verify code input */}
              <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
                <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                  Verification Code
                  <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Account not found)</span>
                </div>
                <div className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] flex flex-row justify-between items-center">
                  <input
                    type="text"
                    className="w-[calc(186/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-0 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                  />
                  <div className="flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(76/375*100vw)] h-[calc(42/375*100vw)] bg-[#270B4F] [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)] rounded-[calc(21/375*100vw)] flex-none order-0 self-stretch grow-0">
                    <div
                      className="w-[calc(41/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-extrabold text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-white flex-none order-1 grow-0 uppercase"
                      onClick={() => {}}>
                      Send
                    </div>
                  </div>
                </div>
              </div>
              {/* password input */}
              <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(82/375*100vw)] gap-[calc(4/375*100vw)]">
                <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                  Password
                  <span className="text-[#EF3851] text-[calc(12/375*100vw)]">(Incorrect password)</span>
                </div>
                <input
                  type="password"
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                />
                <div
                  className="w-[calc(266/375*100vw)] h-[calc(15/375*100vw)] font-['Montserrat'] font-light text-[calc(12/375*100vw)] leading-[calc(15/375*100vw)] tracking-[-0.01em] text-black flex-none order-2 grow-0 flex items-center justify-end gap-[calc(4/375*100vw)]"
                  onClick={() => {
                    setIsResetPass(!isResetPass);
                  }}>
                  <span className="text-[#270B4F] text-[calc(12/375*100vw)] underline">
                    {isResetPass ? "Back to Login" : "Forgot password?"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(58/375*100vw)] bg-[#270B4F] [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)] rounded-[calc(100/375*100vw)] flex-none order-0 self-stretch grow-0">
            <div
              className="h-[calc(20/375*100vw)] font-['Montserrat'] font-extrabold text-[calc(16/375*100vw)] leading-[calc(20/375*100vw)] tracking-[-0.01em] text-white flex-none order-0 grow-0 uppercase"
              onClick={() => {
                if (isResetPass) {
                  onResetPass();
                } else if (isLogin) {
                  onLogin();
                } else {
                  onSignup();
                }
              }}>
              {isResetPass ? "Reset Password" : "Login"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
      <div className="bg-white p-[calc(24/1920*100vw)] rounded-lg w-[calc(314/1920*100vw)] flex flex-col items-center justify-start gap-[calc(24/1920*100vw)] relative">
        <div className="absolute -top-[calc(24/1920*100vw)] -right-[calc(24/1920*100vw)]">
          <img
            src={iconClose}
            alt="close"
            className="w-[calc(24/1920*100vw)] h-[calc(24/1920*100vw)]"
            onClick={onClose}
          />
        </div>

        {/* login/signup button */}
        {!isResetPass && (
          <div className="flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(48/1920*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
            <div
              className={`flex flex-row justify-center items-center py-[calc(6/1920*100vw)] px-[calc(16/1920*100vw)] gap-[calc(10/1920*100vw)] w-[calc(124/1920*100vw)] h-[calc(36/1920*100vw)] rounded-[100px] flex-none order-0 grow`}
              style={{
                backgroundColor: isLogin ? "white" : "",
              }}
              onClick={() => setIsLogin(true)}>
              <div
                className={`w-[calc(59/1920*100vw)] h-[calc(24/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}
                style={{
                  opacity: isLogin ? 1 : 0.5,
                }}>
                Login
              </div>
            </div>
            <div
              className={`flex flex-row justify-center items-center py-[calc(6/1920*100vw)] px-[calc(16/1920*100vw)] gap-[calc(10/1920*100vw)] w-[calc(124/1920*100vw)] h-[calc(36/1920*100vw)] rounded-[100px] flex-none order-1 grow`}
              style={{
                backgroundColor: !isLogin ? "white" : "",
              }}
              onClick={() => setIsLogin(false)}>
              <div
                className={`w-[calc(81/1920*100vw)] h-[calc(24/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-black opacity-50 flex-none order-0 grow-0 flex items-center justify-center`}
                style={{
                  opacity: !isLogin ? 1 : 0.5,
                }}>
                Sign Up
              </div>
            </div>
          </div>
        )}
        {isResetPass && (
          <div className="flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(48/1920*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
            <div
              className={`flex flex-row justify-center items-center py-[calc(6/1920*100vw)] px-[calc(16/1920*100vw)] gap-[calc(10/1920*100vw)] w-[calc(124/1920*100vw)] h-[calc(36/1920*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
              <div
                className={`h-[calc(24/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
                Reset Password
              </div>
            </div>
          </div>
        )}

        {/* login/signup form */}
        {isLogin && (
          <div className="flex flex-col items-center justify-start gap-[calc(16/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(161/1920*100vw)]">
            {/* email input */}
            <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
              <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
                Email
                <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Account not found)</span>
              </div>
              <input
                type="email"
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
              />
            </div>
            {/* password input */}
            <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(82/1920*100vw)] gap-[calc(4/1920*100vw)]">
              <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
                Password
                <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Incorrect password)</span>
              </div>
              <input
                type="password"
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
              />
              <div
                className="w-[calc(266/1920*100vw)] h-[calc(15/1920*100vw)] font-['Montserrat'] font-light text-[calc(12/1920*100vw)] leading-[calc(15/1920*100vw)] tracking-[-0.01em] text-black flex-none order-2 grow-0 flex items-center justify-end gap-[calc(4/1920*100vw)]"
                onClick={() => {
                  setIsResetPass(true);
                  setIsLogin(false);
                }}>
                <span className="text-[#270B4F] text-[calc(12/1920*100vw)] underline">Forgot password?</span>
              </div>
            </div>
          </div>
        )}
        {(!isLogin || isResetPass) && (
          <div className="flex flex-col items-center justify-start gap-[calc(16/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(240/1920*100vw)]">
            {/* email input */}
            <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
              <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
                Email
                <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Account not found)</span>
              </div>
              <input
                type="email"
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
              />
            </div>
            {/* verify code input */}
            <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
              <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
                Verification Code
                <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Account not found)</span>
              </div>
              <div className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] flex flex-row justify-between items-center">
                <input
                  type="text"
                  className="w-[calc(186/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-0 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
                />
                <div className="flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(76/1920*100vw)] h-[calc(42/1920*100vw)] bg-[#270B4F] [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)] rounded-[calc(21/1920*100vw)] flex-none order-0 self-stretch grow-0">
                  <div
                    className="w-[calc(41/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-extrabold text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-white flex-none order-1 grow-0 uppercase"
                    onClick={() => {}}>
                    Send
                  </div>
                </div>
              </div>
            </div>
            {/* password input */}
            <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(82/1920*100vw)] gap-[calc(4/1920*100vw)]">
              <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
                Password
                <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">(Incorrect password)</span>
              </div>
              <input
                type="password"
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
              />
              <div
                className="w-[calc(266/1920*100vw)] h-[calc(15/1920*100vw)] font-['Montserrat'] font-light text-[calc(12/1920*100vw)] leading-[calc(15/1920*100vw)] tracking-[-0.01em] text-black flex-none order-2 grow-0 flex items-center justify-end gap-[calc(4/1920*100vw)]"
                onClick={() => {
                  setIsResetPass(!isResetPass);
                }}>
                <span className="text-[#270B4F] text-[calc(12/1920*100vw)] underline">
                  {isResetPass ? "Back to Login" : "Forgot password?"}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(58/1920*100vw)] bg-[#270B4F] [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)] rounded-[calc(100/1920*100vw)] flex-none order-0 self-stretch grow-0">
          <div
            className="h-[calc(20/1920*100vw)] font-['Montserrat'] font-extrabold text-[calc(16/1920*100vw)] leading-[calc(20/1920*100vw)] tracking-[-0.01em] text-white flex-none order-0 grow-0 uppercase"
            onClick={() => {
              if (isResetPass) {
                onResetPass();
              } else if (isLogin) {
                onLogin();
              } else {
                onSignup();
              }
            }}>
            {isResetPass ? "Reset Password" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}

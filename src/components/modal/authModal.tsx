import { useState, useEffect } from "react";
import iconClose from "../../assets/svg/icon_close.svg";
import { authService } from "../../api";
import { useUserStore } from "../../store";
import { toast } from "sonner";

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
  
  // 表单数据
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  
  // 验证码相关状态
  const [countdown, setCountdown] = useState(0);
  
  // 错误信息
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [codeError, setCodeError] = useState("");
  
  const { login, setLoading, setError, clearError, isLoading } = useUserStore();

  // 验证码倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 发送验证码
  const handleSendCode = async () => {
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }
    
    try {
      setLoading(true);
      clearError();
      
      if (isResetPass) {
        await authService.forgotPasswordSendCode({ email });
      } else {
        await authService.sendVerificationCode({ email });
      }
      
      setCountdown(60);
      toast.success("Verification code sent successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send verification code";
      setError(errorMessage);
      
      // 检查是否是频率限制错误
      if (errorMessage.includes("Please wait") && errorMessage.includes("seconds")) {
        // 解析等待时间
        const match = errorMessage.match(/(\d+)\s*seconds/);
        if (match) {
          const waitSeconds = parseInt(match[1]);
          setCountdown(waitSeconds);
          toast.error(`Please wait ${waitSeconds} seconds before trying again`);
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // 处理登录
  const handleLogin = async () => {
    if (!email || !password) {
      if (!email) setEmailError("Please enter your email");
      if (!password) setPasswordError("Please enter your password");
      return;
    }
    
    try {
      setLoading(true);
      clearError();
      
      const response = await authService.login({ email, password });
      login(response.user, response.tokens);
      
      toast.success("Login successful!");
      onClose();
      onLogin();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 处理注册
  const handleSignup = async () => {
    if (!email || !password || !verificationCode) {
      if (!email) setEmailError("Please enter your email");
      if (!password) setPasswordError("Please enter your password");
      if (!verificationCode) setCodeError("Please enter verification code");
      return;
    }
    
    try {
      setLoading(true);
      clearError();
      
      const response = await authService.register({ 
        email, 
        password, 
        verification_code: verificationCode 
      });
      login(response.user, response.tokens);
      
      toast.success("Registration successful!");
      onClose();
      onSignup();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 处理重置密码
  const handleResetPassword = async () => {
    if (!email || !password || !verificationCode) {
      if (!email) setEmailError("Please enter your email");
      if (!password) setPasswordError("Please enter your password");
      if (!verificationCode) setCodeError("Please enter verification code");
      return;
    }
    
    try {
      setLoading(true);
      clearError();
      
      await authService.resetPassword({ 
        email, 
        password, 
        confirm_password: password, // 使用相同的密码作为确认密码
        code: verificationCode 
      });
      
      toast.success("Password reset successful!");
      onClose();
      onResetPass();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Password reset failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 清除错误信息
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setCodeError("");
  };

  // 切换模式时清除表单和错误
  const switchMode = (mode: 'login' | 'signup' | 'reset') => {
    clearErrors();
    setEmail("");
    setPassword("");
    setVerificationCode("");
    setCountdown(0);
    
    if (mode === 'login') {
      setIsLogin(true);
      setIsResetPass(false);
    } else if (mode === 'signup') {
      setIsLogin(false);
      setIsResetPass(false);
    } else {
      setIsLogin(false);
      setIsResetPass(true);
    }
  };

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
                onClick={() => switchMode('login')}>
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
                onClick={() => switchMode('signup')}>
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
                  {emailError && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({emailError})</span>}
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                />
              </div>
              {/* password input */}
              <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(82/375*100vw)] gap-[calc(4/375*100vw)]">
                <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                  Password
                  {passwordError && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({passwordError})</span>}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                />
                <div
                  className="w-[calc(266/375*100vw)] h-[calc(15/375*100vw)] font-['Montserrat'] font-light text-[calc(12/375*100vw)] leading-[calc(15/375*100vw)] tracking-[-0.01em] text-black flex-none order-2 grow-0 flex items-center justify-end gap-[calc(4/375*100vw)]"
                  onClick={() => switchMode('reset')}>
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
                  {emailError && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({emailError})</span>}
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                />
              </div>
              {/* verify code input */}
              <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(63/375*100vw)] gap-[calc(4/375*100vw)]">
                <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                  Verification Code
                  {codeError && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({codeError})</span>}
                </div>
                <div className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] flex flex-row justify-between items-center">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                      if (codeError) setCodeError("");
                    }}
                    className="w-[calc(186/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-0 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                  />
                  <div className={`flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(76/375*100vw)] h-[calc(42/375*100vw)] rounded-[calc(21/375*100vw)] flex-none order-0 self-stretch grow-0 ${
                    countdown > 0 || isLoading ? 'bg-gray-400' : 'bg-[#270B4F]'
                  } [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)]`}>
                    <div
                      className="w-[calc(41/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-extrabold text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-white flex-none order-1 grow-0 uppercase flex items-center justify-center gap-[calc(4/375*100vw)]"
                      onClick={countdown > 0 || isLoading ? undefined : handleSendCode}
                      style={{ 
                        cursor: countdown > 0 || isLoading ? 'not-allowed' : 'pointer', 
                        opacity: countdown > 0 || isLoading ? 0.5 : 1 
                      }}>
                      {isLoading && (
                        <div className="w-[calc(12/375*100vw)] h-[calc(12/375*100vw)] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      )}
                      {countdown > 0 ? `${countdown}s` : isLoading ? '...' : 'Send'}
                    </div>
                  </div>
                </div>
              </div>
              {/* password input */}
              <div className="flex flex-col items-center justify-center w-[calc(266/375*100vw)] h-[calc(82/375*100vw)] gap-[calc(4/375*100vw)]">
                <div className="w-[calc(266/375*100vw)] h-[calc(17/375*100vw)] font-['Montserrat'] font-light text-[calc(14/375*100vw)] leading-[calc(17/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/375*100vw)]">
                  Password
                  {passwordError && <span className="text-[#EF3851] text-[calc(12/375*100vw)]">({passwordError})</span>}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  className="box-border w-[calc(266/375*100vw)] h-[calc(42/375*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/375*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/375*100vw)]"
                />
                <div
                  className="w-[calc(266/375*100vw)] h-[calc(15/375*100vw)] font-['Montserrat'] font-light text-[calc(12/375*100vw)] leading-[calc(15/375*100vw)] tracking-[-0.01em] text-black flex-none order-2 grow-0 flex items-center justify-end gap-[calc(4/375*100vw)]"
                  onClick={() => switchMode(isResetPass ? 'login' : 'reset')}>
                  <span className="text-[#270B4F] text-[calc(12/375*100vw)] underline">
                    {isResetPass ? "Back to Login" : "Forgot password?"}
                  </span>
                </div>
              </div>
            </div>
          )}
                  <div 
          className={`flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(58/375*100vw)] rounded-[calc(100/375*100vw)] flex-none order-0 self-stretch grow-0 ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#270B4F] cursor-pointer'
          } [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)]`}
          onClick={!isLoading ? () => {
                if (isResetPass) {
              handleResetPassword();
                } else if (isLogin) {
              handleLogin();
                } else {
              handleSignup();
                }
          } : undefined}>
          <div className="h-[calc(20/375*100vw)] font-['Montserrat'] font-extrabold text-[calc(16/375*100vw)] leading-[calc(20/375*100vw)] tracking-[-0.01em] text-white flex-none order-0 grow-0 uppercase flex items-center justify-center gap-[calc(8/375*100vw)]">
            {isLoading && (
              <div className="w-[calc(16/375*100vw)] h-[calc(16/375*100vw)] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {isLoading ? "Loading..." : (isResetPass ? "Reset Password" : isLogin ? "Login" : "Sign Up")}
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
              onClick={() => switchMode('login')}>
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
              onClick={() => switchMode('signup')}>
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
                {emailError && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({emailError})</span>}
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
              />
            </div>
            {/* password input */}
            <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(82/1920*100vw)] gap-[calc(4/1920*100vw)]">
              <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
                Password
                {passwordError && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({passwordError})</span>}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
              />
              <div
                className="w-[calc(266/1920*100vw)] h-[calc(15/1920*100vw)] font-['Montserrat'] font-light text-[calc(12/1920*100vw)] leading-[calc(15/1920*100vw)] tracking-[-0.01em] text-black flex-none order-2 grow-0 flex items-center justify-end gap-[calc(4/1920*100vw)]"
                onClick={() => switchMode('reset')}>
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
                {emailError && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({emailError})</span>}
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
              />
            </div>
            {/* verify code input */}
            <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(63/1920*100vw)] gap-[calc(4/1920*100vw)]">
              <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
                Verification Code
                {codeError && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({codeError})</span>}
              </div>
              <div className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] flex flex-row justify-between items-center">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    if (codeError) setCodeError("");
                  }}
                  className="w-[calc(186/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-0 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
                />
                <div className={`flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(76/1920*100vw)] h-[calc(42/1920*100vw)] rounded-[calc(21/1920*100vw)] flex-none order-0 self-stretch grow-0 ${
                  countdown > 0 || isLoading ? 'bg-gray-400' : 'bg-[#270B4F]'
                } [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)]`}>
                  <div
                    className="w-[calc(41/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-extrabold text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-white flex-none order-1 grow-0 uppercase flex items-center justify-center gap-[calc(4/1920*100vw)]"
                    onClick={countdown > 0 || isLoading ? undefined : handleSendCode}
                    style={{ 
                      cursor: countdown > 0 || isLoading ? 'not-allowed' : 'pointer', 
                      opacity: countdown > 0 || isLoading ? 0.5 : 1 
                    }}>
                    {isLoading && (
                      <div className="w-[calc(12/1920*100vw)] h-[calc(12/1920*100vw)] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {countdown > 0 ? `${countdown}s` : isLoading ? '...' : 'Send'}
                  </div>
                </div>
              </div>
            </div>
            {/* password input */}
            <div className="flex flex-col items-center justify-center w-[calc(266/1920*100vw)] h-[calc(82/1920*100vw)] gap-[calc(4/1920*100vw)]">
              <div className="w-[calc(266/1920*100vw)] h-[calc(17/1920*100vw)] font-['Montserrat'] font-light text-[calc(14/1920*100vw)] leading-[calc(17/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0 flex items-center justify-start gap-[calc(4/1920*100vw)]">
                Password
                {passwordError && <span className="text-[#EF3851] text-[calc(12/1920*100vw)]">({passwordError})</span>}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                className="box-border w-[calc(266/1920*100vw)] h-[calc(42/1920*100vw)] bg-[rgba(39,11,79,0.05)] border border-[#270B4F] rounded-[calc(21/1920*100vw)] flex-none order-1 self-stretch grow-0 z-[1] p-[calc(16/1920*100vw)]"
              />
              <div
                className="w-[calc(266/1920*100vw)] h-[calc(15/1920*100vw)] font-['Montserrat'] font-light text-[calc(12/1920*100vw)] leading-[calc(15/1920*100vw)] tracking-[-0.01em] text-black flex-none order-2 grow-0 flex items-center justify-end gap-[calc(4/1920*100vw)]"
                onClick={() => switchMode(isResetPass ? 'login' : 'reset')}>
                <span className="text-[#270B4F] text-[calc(12/1920*100vw)] underline">
                  {isResetPass ? "Back to Login" : "Forgot password?"}
                </span>
              </div>
            </div>
          </div>
        )}
        <div 
          className={`flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(58/1920*100vw)] rounded-[calc(100/1920*100vw)] flex-none order-0 self-stretch grow-0 ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#270B4F] cursor-pointer'
          } [box-shadow:5px_5px_10px_rgba(136,150,163,0.2),-4px_-4px_10px_rgba(255,255,255,0.4)]`}
          onClick={!isLoading ? () => {
              if (isResetPass) {
              handleResetPassword();
              } else if (isLogin) {
              handleLogin();
              } else {
              handleSignup();
              }
          } : undefined}>
          <div className="h-[calc(20/1920*100vw)] font-['Montserrat'] font-extrabold text-[calc(16/1920*100vw)] leading-[calc(20/1920*100vw)] tracking-[-0.01em] text-white flex-none order-0 grow-0 uppercase flex items-center justify-center gap-[calc(8/1920*100vw)]">
            {isLoading && (
              <div className="w-[calc(16/1920*100vw)] h-[calc(16/1920*100vw)] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {isLoading ? "Loading..." : (isResetPass ? "Reset Password" : isLogin ? "Login" : "Sign Up")}
          </div>
        </div>
      </div>
    </div>
  );
}

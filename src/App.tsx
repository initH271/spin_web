import { useState, useRef } from "react";
import "./App.css";

// 导入所有SVG资源
// import spinPlateBaseImg from "./assets/spin_wheel_img.png";
import spinPlateImg from "./assets/spin-plate-img.svg";
import spinPointerImg from "./assets/spin_pointer.svg";
import luckyWheelImg from "./assets/lucky_wheel.png";
import logoImg from "./assets/logo.svg";
import star1Img from "./assets/star_1.svg";
import star2Img from "./assets/star_2.svg";
import star3Img from "./assets/star_3.svg";
import goldCoin1Img from "./assets/gold_coin_1.svg";
import goldCoin2Img from "./assets/gold_coin_2.svg";
import goldCoin3Img from "./assets/gold_coin_3.svg";
import goldCoin4Img from "./assets/gold_coin_4.svg";
// 弹窗相关资源
import titleImg from "./assets/title.svg";
// import buttonImg from "./assets/button.svg";
import qrcodeImg from "./assets/qrcode.svg";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowCongratulations(false);
    setShowThankYou(false);

    // 重新设计抽奖逻辑：
    // 1. 转盘至少旋转5个360°（1800°）
    // 2. 再加上随机的360°之内的角度
    // 3. 最终角度0-180°中奖，180-360°未中奖
    const baseRotation = 5 * 360; // 至少转5圈
    const randomAngle = Math.floor(Math.random() * 360); // 0-359度随机角度
    const totalRotation = baseRotation + randomAngle;
    const newRotation = rotation + totalRotation;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);

      // 计算最终停止角度
      const finalAngle = newRotation % 360;

      // 判断中奖逻辑：0-180°中奖，180-360°未中奖
      const isWin = finalAngle >= 0 && finalAngle < 180;

      // 根据中奖结果显示对应弹窗
      setTimeout(() => {
        if (isWin) {
          setShowCongratulations(true); // 中奖弹窗
        } else {
          setShowThankYou(true); // 未中奖弹窗
        }
      }, 1000); // 延迟1秒显示弹窗

      console.log(
        "最终角度:",
        finalAngle.toFixed(1) + "°",
        "抽奖结果:",
        isWin ? "BigWin - 中奖!" : "Thank You - 未中奖"
      );
    }, 3000);
  };

  const closeCongratulations = () => {
    setShowCongratulations(false);
  };

  const closeThankYou = () => {
    setShowThankYou(false);
  };

  return (
    <div className="dubai-wheel-container">
      {/* 主框架 - 700×395px */}
      <div className="main-frame">
        {/* 背景渐变 */}
        <div className="background-gradient"></div>

        {/* 背景装饰图片层 */}
        <div className="background-image-8024534"></div>
        <div className="background-gradient-bar"></div>

        <div className="main-left-section">
          {/* Logo */}
          <div className="logo-section">
            <img src={logoImg} alt="EB&LM Logo" className="logo-image" />
          </div>
          {/* Lucky Wheel 文字 */}
          <div className="lucky-wheel-group">
            <img src={luckyWheelImg} alt="Lucky Wheel" className="lucky-wheel-img" />
          </div>
          {/* 底部按钮 */}
          <div className="bottom-button-section">
            <button className="action-button" onClick={spinWheel} disabled={isSpinning}>
              <span className="button-text">{isSpinning ? "Spinning..." : "Spin to Win Now!"}</span>
            </button>
          </div>
        </div>
        <div className="main-right-section">
          <div className="spin-wheel-container">
            {/* 转盘主体区域 (spin_wheel group) */}
            <div className="spin-wheel-group">
              {/* spin_plate_base - 转盘底座 */}
              <div className="spin-plate-base">
                <div className="spin-plate-base-content">
                  {/* spin_plate - 可旋转的转盘 */}
                  <div
                    ref={wheelRef}
                    className={`spin-plate ${isSpinning ? "spinning" : ""}`}
                    style={
                      {
                        transform: `rotate(${rotation}deg)`,
                        "--rotation": `${rotation}deg`,
                      } as React.CSSProperties & { "--rotation": string }
                    }>
                    <img src={spinPlateImg} alt="Spin Plate" className="spin-plate-img" />
                    <div className="spin-plate-base-content">
                      {/* spin_pointer - 中心指针按钮 */}
                      <div
                        className="spin-pointer-group"
                        style={
                          {
                            transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                          } as React.CSSProperties
                        }>
                        <button
                          className={`spin-pointer-button ${isSpinning ? "spinning" : ""}`}
                          onClick={spinWheel}
                          disabled={isSpinning}>
                          <img src={spinPointerImg} alt="Spin Pointer" className="spin-pointer-img" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="decoration-elements">
          {/* 星星装饰 */}
          <div className="star-1">
            <img src={star1Img} alt="Star 1" />
          </div>
          <div className="star-2">
            <img src={star2Img} alt="Star 2" />
          </div>
          <div className="star-3">
            <img src={star3Img} alt="Star 3" />
          </div>

          {/* 金币装饰 */}
          <div className="gold-coin-1">
            <img src={goldCoin1Img} alt="Gold Coin 1" />
          </div>
          <div className="gold-coin-2">
            <img src={goldCoin2Img} alt="Gold Coin 2" />
          </div>
          <div className="gold-coin-3">
            <img src={goldCoin3Img} alt="Gold Coin 3" />
          </div>
          <div className="gold-coin-4">
            <img src={goldCoin4Img} alt="Gold Coin 4" />
          </div>
        </div>

        {/* Congratulations 弹窗 */}
        {showCongratulations && (
          <div className="thank-you-overlay">
            {/* 黑色半透明遮罩 */}
            <div className="thank-you-mask"></div>

            {/* 弹窗主体 */}
            <div className="thank-you-modal">
              {/* 标题区域 - 整个使用title.svg */}
              <img src={titleImg} alt="Title" className="modal-title-img" onClick={closeCongratulations} />

              {/* Thank You主要内容区域 - 独立样式 */}
              <div className="thank-you-main-content">
                <h2 className="thank-you-main-title">Congratulations!</h2>
                <p className="thank-you-subtitle">Please show the screen to our staff</p>

                <p className="thank-you-subtitle">before tapping "OK"</p>

                <div className="modal-button-group" onClick={closeCongratulations}>
                  <div className="modal-button-base5"></div>
                  <div className="modal-button-base8"></div>
                  <div className="modal-button-base9"></div>
                  <div className="modal-button-text">OK</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Thank You 弹窗 - title和button复用congratulations样式 */}
        {showThankYou && (
          <div className="thank-you-overlay">
            {/* 黑色半透明遮罩 */}
            <div className="thank-you-mask"></div>

            {/* 弹窗主体 */}
            <div className="thank-you-modal">
              {/* 标题区域 - 整个使用title.svg */}
              <img src={titleImg} alt="Title" className="modal-title-img" onClick={closeThankYou} />

              {/* Thank You主要内容区域 - 独立样式 */}
              <div className="thank-you-main-content">
                <h2 className="thank-you-main-title">Thank You For Participate</h2>
                <p className="thank-you-subtitle">More Gifts Here!</p>

                {/* 二维码区域 */}
                <div className="thank-you-qrcode">
                  <img src={qrcodeImg} alt="QR Code" className="qrcode-img" />
                </div>
                <div className="modal-button-group" onClick={closeThankYou}>
                  <div className="modal-button-base5"></div>
                  <div className="modal-button-base8"></div>
                  <div className="modal-button-base9"></div>
                  <div className="modal-button-text">OK</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useRef, useState, useCallback } from "react";
import spinPlate from "../assets/images/spin_plate.png";
import spinPointer from "../assets/images/spin_pointer.png";
import spinPlateBase from "../assets/images/plate_base.png";

// 奖品配置
const prizes = [
  { name: "咖啡杯", color: "#fecaca", imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { name: "谢谢参与", color: "#ffffff" },
  { name: "耳机", color: "#fed7aa", imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { name: "谢谢参与", color: "#ffffff" },
  { name: "手表", color: "#bbf7d0", imgUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { name: "谢谢参与", color: "#ffffff" },
  { name: "笔记本", color: "#bfdbfe", imgUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796" },
  { name: "书", color: "#e9d5ff", imgUrl: "https://images.unsplash.com/photo-1510127034180-4613d7d58e6e" },
];

const numPrizes = prizes.length; // 奖品数量
const arc = (2 * Math.PI) / numPrizes; // 每个扇形的弧度
const arcDegrees = 360 / numPrizes; // 每个扇形的度数

const SpinPlate = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [prizeResult, setPrizeResult] = useState("");
  const [_imagesLoaded, setImagesLoaded] = useState(false);
  const loadedImages = useRef<Record<string, HTMLImageElement>>({});
  const waitingAnimationId = useRef<number | null>(null);
  const finalAnimationId = useRef<number | null>(null);

  // 预加载图片
  const preloadImages = useCallback((callback: () => void) => {
    const prizeImages = prizes.filter((p) => p.imgUrl);
    if (prizeImages.length === 0) {
      callback();
      return;
    }

    let loadedCount = 0;
    prizeImages.forEach((p) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = p.imgUrl!;
      img.onload = () => {
        loadedImages.current[p.imgUrl!] = img;
        loadedCount++;
        if (loadedCount === prizeImages.length) {
          setImagesLoaded(true);
          callback();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === prizeImages.length) {
          setImagesLoaded(true);
          callback();
        }
      };
    });
  }, []);

  // 绘制转盘
  const draw = useCallback((selectedIndex = -1) => {
    // 获取 canvas 元素
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 获取 canvas 上下文
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 获取 canvas 的宽度和高度
    const W = canvas.width;
    const H = canvas.height;

    // 清空 canvas
    ctx.clearRect(0, 0, W, H);
    ctx.save(); // 保存当前状态
    ctx.translate(W / 2, H / 2); // 将坐标原点移动到 canvas 中心
    ctx.rotate(-Math.PI / 2); // 旋转 canvas -90 度，从 12 点钟方向开始顺时针绘制扇形

    // 绘制奖品
    prizes.forEach((prize, i) => {
      const angle = i * arc; // 计算每个奖品的起始角度
      ctx.beginPath();
      ctx.fillStyle = prize.color;
      ctx.moveTo(0, 0); // 移动到原点
      ctx.arc(0, 0, W / 2 - 1, angle, angle + arc); // 绘制扇形，W / 2 - 1 是扇形的半径，angle 是起始角度，angle + arc 是结束角度
      ctx.lineTo(0, 0); // 连接到原点
      ctx.fill(); // 填充扇形
      // 只画半径线，使用虚线，并在终点绘制半圆
      ctx.save();
      ctx.setLineDash([2, 2]); // 设置虚线样式，2px 实线，2px 间隔
      ctx.beginPath();
      ctx.moveTo(0, 0); // 移动到原点
      // 计算第一个半径线终点
      const x1 = (W / 2 - 1) * Math.cos(angle);
      const y1 = (W / 2 - 1) * Math.sin(angle);
      ctx.lineTo(x1, y1); // 绘制半径线

      ctx.moveTo(0, 0); // 移动到原点
      // 计算第二个半径线终点
      const x2 = (W / 2 - 1) * Math.cos(angle + arc);
      const y2 = (W / 2 - 1) * Math.sin(angle + arc);
      ctx.lineTo(x2, y2); // 绘制半径线

      ctx.strokeStyle = "#7019A9";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // 在每个半径线终点绘制半圆
      const radius = window.innerWidth < 768 ? 6 : 14;
      ctx.save();
      ctx.beginPath();
      // 第一个半径线终点的半圆
      ctx.arc(x1, y1, radius, angle + Math.PI / 2, angle - Math.PI / 2, false); // 顺时针半圆
      ctx.fillStyle = "#7019A9";
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      // 第二个半径线终点的半圆
      ctx.arc(x2, y2, radius, angle + arc + Math.PI / 2, angle + arc - Math.PI / 2, false); // 顺时针半圆
      ctx.fillStyle = "#7019A9";
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();

      ctx.save(); // 保存当前状态
      const textAngle = angle + arc / 2; // 计算每个奖品的文本角度
      ctx.rotate(textAngle);

      // 绘制图片或文字
      if (prize.imgUrl && loadedImages.current[prize.imgUrl]) {
        const img = loadedImages.current[prize.imgUrl];
        const imgSize = W * 0.1; // 图片大小为 canvas 宽度的 10%
        const imgX = (W / 2) * 0.6; // 图片 x 坐标为 canvas 宽度的 60%
        const imgY = -imgSize / 2; // 图片 y 坐标为图片高度的一半的负值
        ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
      } else {
        // 白色文字，四周阴影，色值从CA94FF到A851FF，四个方向
        ctx.font = `bold ${W * 0.045}px 'Montserrat Alternates'`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const text = prize.name;
        const x = W / 3;
        const y = 0;
        // 四个方向的阴影
        const shadowColors = [
          "#CA94FF", // 上
          "#A851FF", // 下
          "#CA94FF", // 左
          "#A851FF", // 右
        ];
        const shadowOffsets = [
          { x: 0, y: -2 }, // 上
          { x: 0, y: 2 }, // 下
          { x: -2, y: 0 }, // 左
          { x: 2, y: 0 }, // 右
        ];
        for (let i = 0; i < 4; i++) {
          ctx.save();
          ctx.fillStyle = shadowColors[i];
          ctx.globalAlpha = 0.85;
          ctx.fillText(text, x + shadowOffsets[i].x, y + shadowOffsets[i].y);
          ctx.restore();
        }
        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 1;
        ctx.fillText(text, x, y);
        ctx.restore();
      }
      ctx.restore();
    });

    if (selectedIndex !== -1) {
      const angle = selectedIndex * arc;
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, W / 2 - 1, angle, angle + arc);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }, []);

  // 调整 Canvas 大小
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = window.innerWidth < 768 ? 290 : 688; // 固定大小，与 CSS 中的 size-[290px] 对应
    canvas.width = size;
    canvas.height = size;
    draw();
  }, [draw]);

  // 模拟从服务器获取奖品
  const fetchPrizeFromServer = useCallback(() => {
    console.log("Fetching prize from server...");
    return new Promise<number>((resolve) => {
      const delay = Math.random() * 2000 + 1000;
      setTimeout(() => {
        const winningIndex = Math.floor(Math.random() * numPrizes);
        console.log(`Server responded with winning index: ${winningIndex}`);
        resolve(winningIndex);
      }, delay);
    });
  }, []);

  // 开始等待旋转
  const startWaitingSpin = useCallback(() => {
    const waitingSpeed = 720; // degrees per second
    let lastTime: number | null = null;

    const animate = (time: number) => {
      if (lastTime === null) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      setCurrentRotation((prev) => {
        const newRotation = prev + (waitingSpeed * deltaTime) / 1000;
        const normalizedAngle = newRotation % 360;
        const currentIndex = Math.floor(normalizedAngle / arcDegrees);
        draw(currentIndex);
        return newRotation;
      });

      waitingAnimationId.current = requestAnimationFrame(animate);
    };
    waitingAnimationId.current = requestAnimationFrame(animate);
  }, [draw]);

  // 停止等待旋转
  const stopWaitingSpin = useCallback(() => {
    if (waitingAnimationId.current) {
      cancelAnimationFrame(waitingAnimationId.current);
      waitingAnimationId.current = null;
    }
  }, []);

  // 开始抽奖
  const handleSpin = useCallback(async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    draw();

    startWaitingSpin();

    const winningIndex = await fetchPrizeFromServer();
    const winningPrize = prizes[winningIndex];

    stopWaitingSpin();

    // 计算最终旋转角度
    const prizeCenterAngle = winningIndex * arcDegrees + arcDegrees / 2;
    const spinsForDeceleration = 2;

    const nextFullSpin = Math.ceil(currentRotation / 360) * 360;
    const finalRotation = nextFullSpin + spinsForDeceleration * 360 + prizeCenterAngle;

    const duration = 6000;
    let startTime: number | null = null;
    const startRotation = currentRotation;

    const animateFinalSpin = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      const animatedRotation = startRotation + (finalRotation - startRotation) * easedProgress;

      setCurrentRotation(animatedRotation);
      const normalizedAngle = animatedRotation % 360;
      const currentIndex = Math.floor(normalizedAngle / arcDegrees);
      draw(currentIndex);

      if (progress < 1) {
        finalAnimationId.current = requestAnimationFrame(animateFinalSpin);
      } else {
        setIsSpinning(false);
        draw(winningIndex);
        setPrizeResult(winningPrize.name);
        setShowResult(true);
      }
    };
    finalAnimationId.current = requestAnimationFrame(animateFinalSpin);
  }, [isSpinning, currentRotation, draw, startWaitingSpin, stopWaitingSpin, fetchPrizeFromServer]);

  // 关闭结果弹窗
  const handleCloseResult = useCallback(() => {
    setShowResult(false);
    setPrizeResult("");
    draw();
  }, [draw]);

  // 初始化
  useEffect(() => {
    preloadImages(() => {
      resizeCanvas();
    });

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (waitingAnimationId.current) {
        cancelAnimationFrame(waitingAnimationId.current);
      }
      if (finalAnimationId.current) {
        cancelAnimationFrame(finalAnimationId.current);
      }
    };
  }, [resizeCanvas, preloadImages]);

  return (
    <div className="flex flex-col items-center justify-start w-[calc(327/375*100vw)] h-[calc(361/375*100vw)] mt-[calc(47/375*100vw)] px-[calc(24/375*100vw)] *:font-['Montserrat_Alternates'] relative md:w-[calc(776/1920*100vw)] md:h-[calc(856/1920*100vw)] md:mt-0 md:mb-[calc(68/1920*100vw)] md:mr-[calc(175/1920*100vw)]">
      {/* 转盘底座 */}
      <div className="absolute bottom-0 w-[calc(327/375*100vw)] h-[calc(108/375*100vw)] md:w-[calc(776/1920*100vw)] md:h-[calc(258/1920*100vw)]">
        <img src={spinPlateBase} alt="spin plate base" className="w-full h-full" />
      </div>
      {/* 转盘 */}
      <div
        className="size-[calc(323.64/375*100vw)] flex flex-col items-center justify-center relative
      md:size-[calc(768/1920*100vw)]">
        <img src={spinPlate} alt="spin plate" className="absolute inset-0" />
        <canvas
          ref={canvasRef}
          id="spin-plate"
          className="size-[calc(290/375*100vw)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          md:size-[calc(688/1920*100vw)]"
        />
        <div
          className="size-[calc(150/375*100vw)] z-10 md:size-[calc(356/1920*100vw)]"
          style={{ transform: `rotate(${currentRotation}deg)` }}
          onClick={handleSpin}>
          <img src={spinPointer} alt="spin pointer" className="size-full" />
        </div>
      </div>

      {/* 结果弹窗 */}
      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">恭喜你！</h2>
            <p className="text-gray-700 text-xl mb-6">
              你抽中了: <span className="font-bold text-red-500">{prizeResult}</span>
            </p>
            <button
              onClick={handleCloseResult}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg">
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinPlate;

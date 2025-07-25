import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import spinPlate from "../assets/images/spin_plate.png";
import spinPointer from "../assets/images/spin_pointer.png";
import spinPlateBase from "../assets/images/plate_base.png";
import type { StaticsPrize } from "../api/homepageService";
import type { SpinResponseData } from "../api/spinService";
import type { ClaimPrizeResponse } from "../api/prizeService";
import spinService from "../api/spinService";
import prizeService from "../api/prizeService";
import { toast } from "sonner";
import { useHomepageStore } from "../store";
import MessageModal from "./modal/messageModal";
import ClaimPrizeModal from "./modal/claimPrizeModal";
import ClaimTokenPrizeModal from "./modal/claimTokenPrize";

interface SpinPlateProps {
  prizes?: StaticsPrize[];
  wheelInstanceId?: number;
}

// 未中奖奖品占位
const noWinPrize = { id: 0, name: "Missing", image_url: null };

// 默认奖品配置（当没有API数据时使用）
const defaultPrizes = [
  { id: 1, name: "咖啡杯", image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { id: 2, name: "谢谢参与", image_url: null },
  { id: 3, name: "耳机", image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { id: 4, name: "谢谢参与", image_url: null },
  { id: 5, name: "手表", image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { id: 6, name: "谢谢参与", image_url: null },
  { id: 7, name: "笔记本", image_url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796" },
  { id: 8, name: "书", image_url: "https://images.unsplash.com/photo-1510127034180-4613d7d58e6e" },
];

// 奖品颜色配置（9个位置的颜色）
const prizeColors = [
  "#fecaca", "#ffffff", "#fed7aa", "#ffffff", 
  "#bbf7d0", "#ffffff", "#bfdbfe", "#e9d5ff", "#fef3c7"
];

const SpinPlate = ({ prizes: propPrizes, wheelInstanceId }: SpinPlateProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [spinResult, setSpinResult] = useState<SpinResponseData | null>(null);
  const [_imagesLoaded, setImagesLoaded] = useState(false);
  const [modalType, setModalType] = useState<"Congratulations" | "Oops" | "Limited">("Congratulations");
  const [modalMessage, setModalMessage] = useState("");
  const [showClaimPrizeModal, setShowClaimPrizeModal] = useState(false);
  const [showClaimTokenModal, setShowClaimTokenModal] = useState(false);
  
  // 获取转盘状态更新函数
  const { setSpinStatus } = useHomepageStore();
  const loadedImages = useRef<Record<string, HTMLImageElement>>({});
  const waitingAnimationId = useRef<number | null>(null);
  const finalAnimationId = useRef<number | null>(null);

  // 处理奖品数据，确保转盘有9个位置（8个奖品+1个未中奖）
  const prizes = useMemo(() => {
    const prizeList = propPrizes || defaultPrizes;
    const processedPrizes = [...prizeList];
    
    // 如果奖品数量不足8个，重复渲染充满8个位置
    while (processedPrizes.length < 8) {
      processedPrizes.push(...prizeList);
    }
    
    // 确保有8个奖品位置
    const prizePositions = processedPrizes.slice(0, 8);
    
    // 添加未中奖占位到最后一个位置（位置8）
    const finalPrizes = [...prizePositions, noWinPrize];
    

    
    return finalPrizes;
  }, [propPrizes]);

  const numPrizes = prizes.length; // 固定为9
  const arc = (2 * Math.PI) / numPrizes;
  const arcDegrees = 360 / numPrizes;

  // 预加载图片
  const preloadImages = useCallback((callback: () => void) => {
    const prizeImages = prizes.filter((p) => p.image_url);
    if (prizeImages.length === 0) {
      callback();
      return;
    }

    let loadedCount = 0;
    prizeImages.forEach((p) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = p.image_url!;
      img.onload = () => {
        loadedImages.current[p.image_url!] = img;
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
  }, [prizes]);

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
      ctx.fillStyle = prizeColors[i % prizeColors.length]; // 使用循环的颜色配置
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
      if (prize.image_url && loadedImages.current[prize.image_url]) {
        const img = loadedImages.current[prize.image_url];
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
  }, [prizes]);

  // 调整 Canvas 大小
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = window.innerWidth < 768 ? 290 : 688; // 固定大小，与 CSS 中的 size-[290px] 对应
    canvas.width = size;
    canvas.height = size;
    draw();
  }, [draw]);

  // 从服务器获取转盘结果
  const fetchPrizeFromServer = useCallback(async (): Promise<{ winningIndex: number; spinData: SpinResponseData }> => {
    if (!wheelInstanceId) {
      throw new Error("转盘实例ID未提供");
    }

    console.log("Fetching prize from server...");
    const response = await spinService.spin({ wheel_instance_id: wheelInstanceId });
    console.log("Spin response:", response);

    // 根据服务器响应决定最终位置
    let winningIndex = 0;
    if (response.is_win && response.prize) {
      // 中奖：找到对应的奖品索引
      const prizeIndex = prizes.findIndex(p => p.id === response.prize!.id);
      if (prizeIndex !== -1) {
        winningIndex = prizeIndex;
      }
    } else {
      // 未中奖：指向未中奖占位（最后一个位置）
      winningIndex = prizes.length - 1;
    }

    return { winningIndex, spinData: response };
  }, [wheelInstanceId, prizes]);

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

    // 检查是否有剩余次数
    const { spinStatus } = useHomepageStore.getState();
    if (spinStatus && !spinStatus.can_spin) {
      // 没有次数，直接显示Limited弹窗
      setModalType("Limited");
      setModalMessage(`You have reached the maximum of ${spinStatus.max_spin_count} attempts for today.`);
      setShowResult(true);
      return;
    }

    setIsSpinning(true);
    draw();

    startWaitingSpin();

        try {
      const { winningIndex, spinData } = await fetchPrizeFromServer();
      setSpinResult(spinData);

      stopWaitingSpin();

          // 计算最终旋转角度
    // 转盘奖品从12点钟方向开始顺时针排列，每个扇形40度
    // 指针需要旋转到对应奖品的中心位置
    // 由于指针指向12点钟方向，需要计算指针应该旋转的角度
    const prizeCenterAngle = winningIndex * arcDegrees + arcDegrees / 2;
    const spinsForDeceleration = 4; // 至少旋转4圈

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
          
          // 根据结果设置弹窗类型和消息
          if (spinData.is_win && spinData.prize) {
            // 中奖情况
            setModalType("Congratulations");
            let message = `You caught a ${spinData.prize.name}`;
            if (spinData.prize.cash_amount) {
              message += `*${spinData.prize.cash_amount}`;
            }
            setModalMessage(message);
          } else {
            // 未中奖情况，使用Oops弹窗
            setModalType("Oops");
            setModalMessage("You missed the prize.\nTry again!");
          }
          setShowResult(true);
          
          // 更新转盘状态
          if (wheelInstanceId) {
            spinService.getDailySpinStatus({ wheel_instance_id: wheelInstanceId })
              .then((newSpinStatus) => {
                setSpinStatus(newSpinStatus);
              })
              .catch((error) => {
                console.error('Failed to update spin status:', error);
              });
          }
        }
      };
      finalAnimationId.current = requestAnimationFrame(animateFinalSpin);
    } catch (error) {
      stopWaitingSpin();
      setIsSpinning(false);
      const errorMessage = error instanceof Error ? error.message : "转盘失败，请重试";
      toast.error(errorMessage);
      console.error("Spin error:", error);
    }
  }, [isSpinning, currentRotation, draw, startWaitingSpin, stopWaitingSpin, fetchPrizeFromServer, prizes]);

  // 关闭结果弹窗
  const handleCloseResult = useCallback(() => {
    setShowResult(false);
    setModalMessage("");
    draw();
  }, [draw]);

  // 处理Claim按钮点击
  const handleClaim = useCallback(() => {
    if (!spinResult?.user_prize_id) {
      toast.error("奖品信息不完整，无法领取");
      return;
    }

    // 根据奖品类型决定使用哪个弹窗
    if (spinResult.prize?.type === "physical") {
      // 实物奖品，显示收件地址收集弹窗
      setShowClaimPrizeModal(true);
    } else {
      // 非实物奖品（现金/代币），显示提现账户收集弹窗
      setShowClaimTokenModal(true);
    }
    
    // 关闭结果弹窗
    handleCloseResult();
  }, [spinResult, handleCloseResult]);

  // 处理Collect按钮点击
  const handleCollect = useCallback(() => {
    // TODO: 实现Collect逻辑
    console.log("Collect clicked");
    handleCloseResult();
  }, [handleCloseResult]);

  // 处理实物奖品领取
  const handleClaimPhysicalPrize = useCallback(async (deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    postal_code?: string;
  }) => {
    if (!spinResult?.user_prize_id) {
      toast.error("奖品信息不完整，无法领取");
      return;
    }

    try {
      const response: ClaimPrizeResponse = await prizeService.claimPrize({
        user_prize_id: spinResult.user_prize_id,
        claim_type: 'physical_delivery',
        delivery_address: deliveryAddress,
      });
      
      // 调试：打印API响应
      console.log("Claim prize response:", response);
      
      // 显示英文成功消息
      toast.success("Prize claimed successfully!");
      setShowClaimPrizeModal(false);
      
      // 重置表单数据
      setSpinResult(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "领取失败，请重试";
      toast.error(errorMessage);
      console.error("Claim prize error:", error);
    }
  }, [spinResult]);

  // 处理现金/代币奖品领取
  const handleClaimTokenPrize = useCallback(async (accountInfo: string) => {
    if (!spinResult?.user_prize_id) {
      toast.error("奖品信息不完整，无法领取");
      return;
    }

    try {
      const response: ClaimPrizeResponse = await prizeService.claimPrize({
        user_prize_id: spinResult.user_prize_id,
        claim_type: 'cash_payout',
        cash_account: {
          account_type: 'alipay', // 默认使用支付宝，可以根据实际情况调整
          account_info: accountInfo,
        },
      });
      
      // 调试：打印API响应
      console.log("Claim token response:", response);
      
      // 显示英文成功消息
      toast.success("Prize claimed successfully!");
      setShowClaimTokenModal(false);
      
      // 重置表单数据
      setSpinResult(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "领取失败，请重试";
      toast.error(errorMessage);
      console.error("Claim token error:", error);
    }
  }, [spinResult]);

  // 关闭实物奖品领取弹窗
  const handleCloseClaimPrizeModal = useCallback(() => {
    setShowClaimPrizeModal(false);
  }, []);

  // 关闭现金/代币奖品领取弹窗
  const handleCloseClaimTokenModal = useCallback(() => {
    setShowClaimTokenModal(false);
  }, []);

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
  }, [resizeCanvas, preloadImages, prizes]);

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
      <MessageModal
        isOpen={showResult}
        messageType={modalType}
        message={modalMessage}
        onClose={handleCloseResult}
        onClaim={modalType === "Congratulations" ? handleClaim : undefined}
        onCollect={modalType === "Congratulations" ? handleCollect : undefined}
      />

      {/* 实物奖品领取弹窗 */}
      <ClaimPrizeModal
        isOpen={showClaimPrizeModal}
        onClose={handleCloseClaimPrizeModal}
        onClaim={handleClaimPhysicalPrize}
      />

      {/* 现金/代币奖品领取弹窗 */}
      <ClaimTokenPrizeModal
        isOpen={showClaimTokenModal}
        onClose={handleCloseClaimTokenModal}
        onClaim={handleClaimTokenPrize}
      />
    </div>
  );
};

export default SpinPlate;

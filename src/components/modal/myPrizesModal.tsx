
import { useState, useEffect } from "react";
import iconClose from "../../assets/svg/icon_close.svg";
import prizeService from "../../api/prizeService";
import type { UserPrize } from "../../api/prizeService";
import ClaimPrizeModal from "./claimPrizeModal";
import ClaimTokenPrizeModal from "./claimTokenPrize";
import { toast } from "sonner";

interface MyPrizesModalProps {
  isOpen: boolean;
  onClaim: () => void;
  onClose: () => void;
}

export default function MyPrizesModal({ isOpen, onClose, onClaim }: MyPrizesModalProps) {
  const [prizes, setPrizes] = useState<UserPrize[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrize, setSelectedPrize] = useState<UserPrize | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showTokenClaimModal, setShowTokenClaimModal] = useState(false);

  // 获取用户奖品列表
  const fetchPrizes = async () => {
    if (!isOpen) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await prizeService.getUserPrizes();
      setPrizes(response.prizes || []);
    } catch (err) {
      console.error('Failed to fetch prizes:', err);
      setError('Failed to fetch prizes, please try again later');
    } finally {
      setLoading(false);
    }
  };

  // 处理奖品领取
  const handleClaim = async (prize: UserPrize) => {
    // 根据奖品类型决定处理方式
    if (prize.prize.type === 'physical') {
      // 实物奖品，显示领奖窗口
      setSelectedPrize(prize);
      setShowClaimModal(true);
    } else if (prize.prize.type === 'cash') {
      // 现金奖品，显示账户信息输入窗口
      setSelectedPrize(prize);
      setShowTokenClaimModal(true);
    } else {
      // 其他类型，默认使用实物配送
      setSelectedPrize(prize);
      setShowClaimModal(true);
    }
  };

  // 处理实物奖品领奖窗口的提交
  const handleClaimSubmit = async (deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    postal_code?: string;
  }) => {
    if (!selectedPrize) return;

    try {
      await prizeService.claimPrize({
        user_prize_id: selectedPrize.id,
        claim_type: 'physical_delivery',
        delivery_address: deliveryAddress
      });
      
      // 重新获取奖品列表以更新状态
      await fetchPrizes();
      
      // 关闭领奖窗口
      setShowClaimModal(false);
      setSelectedPrize(null);
      
      // 显示成功提示
      toast.success("Prize claimed successfully!");
      
      // 调用父组件的onClaim回调
      onClaim();
    } catch (err) {
      console.error('Failed to claim prize:', err);
      setError('Failed to claim prize, please try again later');
    }
  };

  // 处理现金奖品领奖窗口的提交
  const handleTokenClaimSubmit = async (accountInfo: string) => {
    if (!selectedPrize) return;

    try {
      await prizeService.claimPrize({
        user_prize_id: selectedPrize.id,
        claim_type: 'cash_payout',
        cash_account: {
          account_type: 'alipay', // 可以根据需要调整账户类型
          account_info: accountInfo
        }
      });
      
      // 重新获取奖品列表以更新状态
      await fetchPrizes();
      
      // 关闭领奖窗口
      setShowTokenClaimModal(false);
      setSelectedPrize(null);
      
      // 显示成功提示
      toast.success("Prize claimed successfully!");
      
      // 调用父组件的onClaim回调
      onClaim();
    } catch (err) {
      console.error('Failed to claim prize:', err);
      setError('Failed to claim prize, please try again later');
    }
  };

  // 关闭实物领奖窗口
  const handleCloseClaimModal = () => {
    setShowClaimModal(false);
    setSelectedPrize(null);
  };

  // 关闭现金领奖窗口
  const handleCloseTokenClaimModal = () => {
    setShowTokenClaimModal(false);
    setSelectedPrize(null);
  };

  // 当模态框打开时获取奖品列表
  useEffect(() => {
    if (isOpen) {
      fetchPrizes();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isMobile = window.innerWidth < 768;

  // 渲染奖品项
  const renderPrizeItem = (prize: UserPrize, isMobile: boolean) => {
    const baseSize = isMobile ? 375 : 1920;
    const calc = (value: number) => `calc(${value}/${baseSize}*100vw)`;
    
    return (
      <div 
        key={prize.id}
        className={`w-[${calc(266)}] h-[${calc(42)}] bg-[#270B4F]/5 rounded-[${calc(21)}] flex-none order-0 grow z-0 relative`}
      >
        <div className={`flex items-center justify-start px-[${calc(21)}] w-[${calc(190)}] h-[${calc(42)}]`}>
          <div className="flex flex-col">
            <div className={`font-['Montserrat'] font-bold text-[${calc(14)}] leading-[${calc(17)}] text-black`}>
              {prize.prize.name} {prize.prize.cash_amount && `*${prize.prize.cash_amount}`}
            </div>
          </div>
        </div>

        <div
          className={`flex flex-row justify-center items-center p-0 gap-[4px] absolute w-[${calc(76)}] h-[${calc(42)}] right-0 top-0 bg-[#270B4F] rounded-[${calc(21)}] text-white flex-none order-1 grow-0 cursor-pointer`}
          onClick={() => handleClaim(prize)}
        >
          <div className={`w-[${calc(48)}] h-[${calc(17)}] font-['Montserrat'] font-extrabold text-[${calc(14)}] leading-[${calc(17)}] tracking-[-0.01em] uppercase text-white flex-none order-0 grow-0`}>
            {prize.status === 'claimed' ? 'Claimed' : 'Claim'}
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <>
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
          <div className="bg-white p-[calc(24/375*100vw)] rounded-lg w-[calc(314/375*100vw)] max-h-[calc(612/375*100vw)] flex flex-col items-center justify-start gap-[calc(24/375*100vw)] relative">
            {/* close button */}
            <div className="absolute -top-[calc(24/375*100vw)] -right-[calc(24/375*100vw)]">
              <img
                src={iconClose}
                alt="close"
                className="w-[calc(24/375*100vw)] h-[calc(24/375*100vw)] cursor-pointer"
                onClick={onClose}
              />
            </div>
            {/* my prizes title */}
            <div className="flex flex-row justify-center items-center p-[calc(6/375*100vw)] gap-[calc(6/375*100vw)] w-[calc(266/375*100vw)] h-[calc(48/375*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
              <div
                className={`flex flex-row justify-center items-center py-[calc(6/375*100vw)] px-[calc(16/375*100vw)] gap-[calc(10/375*100vw)] w-[calc(124/375*100vw)] h-[calc(36/375*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
                <div
                  className={`h-[calc(24/375*100vw)] font-['Montserrat'] font-bold text-[calc(20/375*100vw)] leading-[calc(24/375*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
                  My Prizes
                </div>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="w-[calc(266/375*100vw)] p-[calc(12/375*100vw)] bg-red-50 border border-red-200 rounded-[calc(8/375*100vw)]">
                <div className="text-red-600 text-[calc(12/375*100vw)]">{error}</div>
              </div>
            )}

            {/* 奖品列表 */}
            <div className="flex flex-col items-center justify-start gap-[calc(16/375*100vw)] w-[calc(266/375*100vw)] overflow-y-auto scroll-bar-hidden">
              {loading ? (
                <div className="flex items-center justify-center w-full h-[calc(100/375*100vw)]">
                  <div className="text-[calc(14/375*100vw)] text-gray-500">Loading...</div>
                </div>
              ) : prizes.length === 0 ? (
                <div className="flex items-center justify-center w-full h-[calc(100/375*100vw)]">
                  <div className="text-[calc(14/375*100vw)] text-gray-500">No prizes yet</div>
                </div>
              ) : (
                prizes.map((prize) => renderPrizeItem(prize, true))
              )}
            </div>
          </div>
        </div>

        {/* 实物领奖窗口 */}
        <ClaimPrizeModal
          isOpen={showClaimModal}
          onClose={handleCloseClaimModal}
          onClaim={handleClaimSubmit}
        />

        {/* 现金领奖窗口 */}
        <ClaimTokenPrizeModal
          isOpen={showTokenClaimModal}
          onClose={handleCloseTokenClaimModal}
          onClaim={handleTokenClaimSubmit}
        />
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
        <div className="bg-white p-[calc(24/1920*100vw)] rounded-lg w-[calc(314/1920*100vw)] max-h-[calc(612/1920*100vw)] flex flex-col items-center justify-start gap-[calc(24/1920*100vw)] relative">
          {/* close button */}
          <div className="absolute -top-[calc(24/1920*100vw)] -right-[calc(24/1920*100vw)]">
            <img
              src={iconClose}
              alt="close"
              className="w-[calc(24/1920*100vw)] h-[calc(24/1920*100vw)] cursor-pointer"
              onClick={onClose}
            />
          </div>
          {/* my prizes title */}
          <div className="flex flex-row justify-center items-center p-[calc(6/1920*100vw)] gap-[calc(6/1920*100vw)] w-[calc(266/1920*100vw)] h-[calc(48/1920*100vw)] bg-[rgba(39,11,79,0.05)] [box-shadow:inset_0px_0px_9.77974px_2.44493px_rgba(255,255,255,0.1)] rounded-[24px] flex-none order-0 self-stretch grow-0">
            <div
              className={`flex flex-row justify-center items-center py-[calc(6/1920*100vw)] px-[calc(16/1920*100vw)] gap-[calc(10/1920*100vw)] w-[calc(124/1920*100vw)] h-[calc(36/1920*100vw)] rounded-[100px] flex-none order-0 grow bg-white`}>
              <div
                className={`h-[calc(24/1920*100vw)] font-['Montserrat'] font-bold text-[calc(20/1920*100vw)] leading-[calc(24/1920*100vw)] tracking-[-0.01em] text-black flex-none order-0 grow-0`}>
                My Prizes
              </div>
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="w-[calc(266/1920*100vw)] p-[calc(12/1920*100vw)] bg-red-50 border border-red-200 rounded-[calc(8/1920*100vw)]">
              <div className="text-red-600 text-[calc(12/1920*100vw)]">{error}</div>
            </div>
          )}

          {/* 奖品列表 */}
          <div className="flex flex-col items-center justify-start gap-[calc(16/1920*100vw)] w-[calc(266/1920*100vw)] overflow-y-auto scroll-bar-hidden">
            {loading ? (
              <div className="flex items-center justify-center w-full h-[calc(100/1920*100vw)]">
                <div className="text-[calc(14/1920*100vw)] text-gray-500">Loading...</div>
              </div>
            ) : prizes.length === 0 ? (
              <div className="flex items-center justify-center w-full h-[calc(100/1920*100vw)]">
                <div className="text-[calc(14/1920*100vw)] text-gray-500">No prizes yet</div>
              </div>
            ) : (
              prizes.map((prize) => renderPrizeItem(prize, false))
            )}
          </div>
        </div>
      </div>

      {/* 实物领奖窗口 */}
      <ClaimPrizeModal
        isOpen={showClaimModal}
        onClose={handleCloseClaimModal}
        onClaim={handleClaimSubmit}
      />

      {/* 现金领奖窗口 */}
      <ClaimTokenPrizeModal
        isOpen={showTokenClaimModal}
        onClose={handleCloseTokenClaimModal}
        onClaim={handleTokenClaimSubmit}
      />
    </>
  );
}

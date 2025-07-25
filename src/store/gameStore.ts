import { create } from 'zustand';
import type { SpinResponseData } from '../api/spinService';

interface GameState {
  // 当前转盘实例ID
  currentWheelInstanceId: number | null;
  // 转盘游戏结果
  spinResult: SpinResponseData | null;
  // 每日转盘状态
  dailySpinStatus: {
    remaining_spins: number;
    total_spins_today: number;
    max_spins_per_day: number;
    can_spin_again: boolean;
  } | null;
  // 加载状态
  isLoading: boolean;
  // 错误信息
  error: string | null;
}

interface GameActions {
  // 设置当前转盘实例ID
  setCurrentWheelInstanceId: (id: number) => void;
  // 设置转盘游戏结果
  setSpinResult: (result: SpinResponseData) => void;
  // 设置每日转盘状态
  setDailySpinStatus: (status: GameState['dailySpinStatus']) => void;
  // 设置加载状态
  setLoading: (loading: boolean) => void;
  // 设置错误信息
  setError: (error: string | null) => void;
  // 清除错误信息
  clearError: () => void;
  // 重置游戏状态
  resetGameState: () => void;
}

type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>((set) => ({
  // 初始状态
  currentWheelInstanceId: null,
  spinResult: null,
  dailySpinStatus: null,
  isLoading: false,
  error: null,

  // 设置当前转盘实例ID
  setCurrentWheelInstanceId: (id) => set({ currentWheelInstanceId: id }),

  // 设置转盘游戏结果
  setSpinResult: (result) => set({ spinResult: result }),

  // 设置每日转盘状态
  setDailySpinStatus: (status) => set({ dailySpinStatus: status }),

  // 设置加载状态
  setLoading: (isLoading) => set({ isLoading }),

  // 设置错误信息
  setError: (error) => set({ error }),

  // 清除错误信息
  clearError: () => set({ error: null }),

  // 重置游戏状态
  resetGameState: () => set({
    currentWheelInstanceId: null,
    spinResult: null,
    dailySpinStatus: null,
    error: null,
  }),
})); 
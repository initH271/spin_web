import { create } from 'zustand';
import type { StaticsResponseData } from '../api/homepageService';
import type { DailySpinStatusData } from '../api/spinService';

interface HomepageState {
  // 首页数据
  homepageData: StaticsResponseData | null;
  // 转盘状态数据
  spinStatus: DailySpinStatusData | null;
  // 当前URL slug
  currentUrlSlug: string | null;
  // 加载状态
  isLoading: boolean;
  // 错误信息
  error: string | null;
}

interface HomepageActions {
  // 设置首页数据
  setHomepageData: (data: StaticsResponseData) => void;
  // 设置转盘状态
  setSpinStatus: (data: DailySpinStatusData) => void;
  // 设置当前URL slug
  setCurrentUrlSlug: (slug: string) => void;
  // 设置加载状态
  setLoading: (loading: boolean) => void;
  // 设置错误信息
  setError: (error: string | null) => void;
  // 清除错误信息
  clearError: () => void;
  // 重置状态
  reset: () => void;
}

type HomepageStore = HomepageState & HomepageActions;

export const useHomepageStore = create<HomepageStore>((set) => ({
  // 初始状态
  homepageData: null,
  spinStatus: null,
  currentUrlSlug: null,
  isLoading: false,
  error: null,

  // 设置首页数据
  setHomepageData: (data) => set({ homepageData: data }),

  // 设置转盘状态
  setSpinStatus: (data) => set({ spinStatus: data }),

  // 设置当前URL slug
  setCurrentUrlSlug: (slug) => set({ currentUrlSlug: slug }),

  // 设置加载状态
  setLoading: (isLoading) => set({ isLoading }),

  // 设置错误信息
  setError: (error) => set({ error }),

  // 清除错误信息
  clearError: () => set({ error: null }),

  // 重置状态
  reset: () => set({
    homepageData: null,
    spinStatus: null,
    currentUrlSlug: null,
    isLoading: false,
    error: null,
  }),
})); 
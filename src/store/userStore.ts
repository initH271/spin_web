import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, TokenResponse } from '../api/authService';

interface UserState {
  // 用户信息
  user: User | null;
  // 访问令牌
  accessToken: string | null;
  // 刷新令牌
  refreshToken: string | null;
  // 是否已登录
  isLoggedIn: boolean;
  // 加载状态
  isLoading: boolean;
  // 错误信息
  error: string | null;
}

interface UserActions {
  // 设置用户信息
  setUser: (user: User) => void;
  // 设置令牌
  setTokens: (tokens: TokenResponse) => void;
  // 登录
  login: (user: User, tokens: TokenResponse) => void;
  // 登出
  logout: () => void;
  // 设置加载状态
  setLoading: (loading: boolean) => void;
  // 设置错误信息
  setError: (error: string | null) => void;
  // 清除错误信息
  clearError: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // 初始状态
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      // 设置用户信息
      setUser: (user) => set({ user }),

      // 设置令牌
      setTokens: (tokens) => set({ 
        accessToken: tokens.access, 
        refreshToken: tokens.refresh 
      }),

      // 登录
      login: (user, tokens) => set({
        user,
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
        isLoggedIn: true,
        error: null,
      }),

      // 登出
      logout: () => set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoggedIn: false,
        error: null,
      }),

      // 设置加载状态
      setLoading: (isLoading) => set({ isLoading }),

      // 设置错误信息
      setError: (error) => set({ error }),

      // 清除错误信息
      clearError: () => set({ error: null }),
    }),
    {
      name: 'user-storage', // 本地存储的key
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
); 
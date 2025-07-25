import { useEffect } from 'react';
import { useUserStore, useHomepageStore } from '../store';
import homepageService from '../api/homepageService';
import spinService from '../api/spinService';
import { toast } from 'sonner';

export const useHomepage = (urlSlug: string | null) => {
  const { isLoggedIn } = useUserStore();
  const {
    homepageData,
    spinStatus,
    currentUrlSlug,
    isLoading,
    error,
    setHomepageData,
    setSpinStatus,
    setCurrentUrlSlug,
    setLoading,
    setError,
    clearError,
    reset,
  } = useHomepageStore();

  // 获取首页数据
  const fetchHomepageData = async (slug: string) => {
    if (!isLoggedIn) return;
    
    try {
      setLoading(true);
      clearError();
      
      const response = await homepageService.getHomepage({ url_slug: slug });
      setHomepageData(response);
      
      // 如果获取到转盘实例信息，获取转盘状态
      if (response.wheel_instance?.id) {
        await fetchSpinStatus(response.wheel_instance.id);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch homepage data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 获取转盘状态
  const fetchSpinStatus = async (wheelInstanceId: number) => {
    if (!isLoggedIn) return;
    
    try {
      const response = await spinService.getDailySpinStatus({ wheel_instance_id: wheelInstanceId });
      setSpinStatus(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch spin status';
      console.error('Spin status error:', errorMessage);
      // 转盘状态错误不显示toast，避免干扰用户体验
    }
  };

  // 更新转盘状态（转盘后调用）
  const updateSpinStatus = async (wheelInstanceId: number) => {
    if (!isLoggedIn) return;
    
    try {
      const response = await spinService.getDailySpinStatus({ wheel_instance_id: wheelInstanceId });
      setSpinStatus(response);
    } catch (error) {
      console.error('Failed to update spin status:', error);
    }
  };

  // 当URL slug变化时获取数据
  useEffect(() => {
    if (urlSlug && urlSlug !== currentUrlSlug) {
      setCurrentUrlSlug(urlSlug);
      if (isLoggedIn) {
        fetchHomepageData(urlSlug);
      }
    }
  }, [urlSlug, currentUrlSlug, isLoggedIn]);

  // 当用户登录状态变化时获取数据
  useEffect(() => {
    if (isLoggedIn && currentUrlSlug) {
      fetchHomepageData(currentUrlSlug);
    } else if (!isLoggedIn) {
      // 用户登出时重置数据
      reset();
    }
  }, [isLoggedIn, currentUrlSlug]);

  return {
    homepageData,
    spinStatus,
    isLoading,
    error,
    fetchHomepageData,
    fetchSpinStatus,
    updateSpinStatus,
  };
}; 
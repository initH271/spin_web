// 统一导出所有API服务
export { default as authService } from './authService';
export { default as spinService } from './spinService';
export { default as prizeService } from './prizeService';
export { default as homepageService } from './homepageService';

// 导出类型定义
export type * from './authService';
export type * from './spinService';
export type * from './prizeService';
export type * from './homepageService';

// 导出API客户端
export { default as apiClient } from './apiClient';
export type { Result } from './apiClient'; 
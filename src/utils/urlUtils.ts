/**
 * 从URL路径中解析转盘实例的URL slug
 * @param pathname 当前路径，如 "/wheel-lyw5g96i"
 * @returns URL slug，如 "lyw5g96i"，如果没有匹配则返回null
 */
export const parseWheelSlugFromPath = (pathname: string): string | null => {
  // 匹配 /wheel-{slug} 格式
  const match = pathname.match(/^\/wheel-([a-zA-Z0-9_-]+)$/);
  return match ? match[1] : null;
};

/**
 * 检查当前路径是否是转盘页面
 * @param pathname 当前路径
 * @returns 是否是转盘页面
 */
export const isWheelPage = (pathname: string): boolean => {
  return /^\/wheel-/.test(pathname);
}; 
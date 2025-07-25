import { useLocation, useParams } from "react-router";
import { parseWheelSlugFromPath, isWheelPage } from "../utils/urlUtils";

/**
 * 自定义hook：解析当前路由中的转盘相关信息
 * @returns 包含wheelSlug和isWheelPagePath的对象
 */
export const useWheelRoute = () => {
  const location = useLocation();
  const params = useParams();
  const currentPath = location.pathname;
  
  // 优先使用URL参数中的slug，如果没有则从路径中解析
  const wheelSlug = params.slug || parseWheelSlugFromPath(currentPath);
  const isWheelPagePath = isWheelPage(currentPath);

  return {
    currentPath,
    wheelSlug,
    isWheelPagePath,
  };
}; 
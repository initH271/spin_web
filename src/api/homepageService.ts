import apiClient from "./apiClient";

// 主页数据相关类型定义
export interface StaticsWheelInstance {
	/** 转盘实例ID */
	id: number;
	/** 转盘实例名称 */
	name: string;
	/** 转盘URL */
	wheel_url: string;
}

export interface StaticsStyle {
	/** 样式名称 */
	name: string;
	/** LOGO图片 */
	logo_image: string | null;
	/** 标题图片 */
	title_image: string | null;
	/** 背景图片 */
	background_image: string | null;
	/** 转盘图片 */
	wheel_image: string | null;
	/** 指针图片 */
	pointer_image: string | null;
}

export interface StaticsPrize {
	/** 奖品ID */
	id: number;
	/** 奖品名称 */
	name: string;
	/** 奖品图片URL */
	image_url: string | null;
}

export interface StaticsResponseData {
	/** 转盘实例信息 */
	wheel_instance: StaticsWheelInstance;
	/** 样式信息 */
	style: StaticsStyle;
	/** 奖品列表 */
	prizes: StaticsPrize[];
}

// 获取主页数据请求接口
export interface GetHomepageRequest {
	/** 转盘实例的URL标识，可选参数。如果不提供，则返回默认转盘实例的数据 */
	url_slug?: string;
}

export interface GetHomepageResponse {
	/** 主页数据 */
	data: StaticsResponseData;
}

// 由于apiClient已经处理了响应结构，实际返回的是StaticsResponseData
export type HomepageResponse = StaticsResponseData;

// API路径枚举
export enum HomepageApi {
	GetHomepage = "/api/homepage/",
}

// API函数定义
const getHomepage = (params?: GetHomepageRequest) => 
	apiClient.get<HomepageResponse>({ url: HomepageApi.GetHomepage, params });

export default {
	getHomepage,
}; 
import apiClient from "./apiClient";

// 转盘游戏相关类型定义
export interface WheelInstanceInfo {
	/** 转盘实例ID */
	id: number;
	/** 转盘实例名称 */
	name: string;
	/** URL标识 */
	url_slug: string;
}

export interface PrizeInfo {
	/** 奖品ID */
	id: number;
	/** 奖品名称 */
	name: string;
	/** 奖品类型 */
	type: string;
	/** 奖品描述 */
	description: string;
	/** 奖品图片URL */
	image_url: string | null;
	/** 中奖概率 */
	probability: number;
	/** 现金金额 */
	cash_amount: string | null;
}

export interface SpinResponseData {
	/** 是否中奖 */
	is_win: boolean;
	/** 奖品信息 */
	prize: PrizeInfo | null;
	/** 剩余转盘次数 */
	remaining_spins: number;
	/** 今日已转次数 */
	total_spins_today: number;
	/** 每日最大转盘次数 */
	max_spins_per_day: number;
	/** 是否可以再次转盘 */
	can_spin_again: boolean;
	/** 转盘历史记录ID */
	spin_history_id: number;
	/** 转盘实例信息 */
	wheel_instance: WheelInstanceInfo;
	/** 用户奖品ID */
	user_prize_id: number | null;
}

// 转盘游戏请求接口
export interface SpinRequest {
	/** 转盘实例ID */
	wheel_instance_id: number;
}

export interface SpinResponse {
	/** 转盘游戏响应数据 */
	data: SpinResponseData;
}

// 每日转盘状态请求接口
export interface DailySpinStatusRequest {
	/** 转盘实例ID */
	wheel_instance_id: number;
}

// 每日转盘次数状态数据类型
export interface DailySpinStatusData {
    wheel_instance: {
      id: number;
      name: string;
      daily_spin_limit: number;
    };
    spin_date: string;
    spin_count: number;
    max_spin_count: number;
    remaining_count: number;
    can_spin: boolean;
    next_reset_time: string;
    time_until_reset: {
      hours: number;
      minutes: number;
      total_seconds: number;
    };
    timezone_info: {
      current_utc_time: string;
      note: string;
    };
  }

// API路径枚举
export enum SpinApi {
	Spin = "/api/spin/",
	DailySpinStatus = "/api/daily-spin-status/",
}

// API函数定义
const spin = (data: SpinRequest) => 
	apiClient.post<SpinResponseData>({ url: SpinApi.Spin, data });

const getDailySpinStatus = (params: DailySpinStatusRequest) => 
	apiClient.get<DailySpinStatusData>({ url: SpinApi.DailySpinStatus, params });

export default {
	spin,
	getDailySpinStatus,
}; 
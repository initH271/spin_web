import apiClient from "./apiClient";

// 奖品信息接口
export interface Prize {
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
	/** 现金金额 */
	cash_amount: number | null;
}

// 转盘实例接口
export interface WheelInstance {
	/** 转盘实例ID */
	id: number;
	/** 转盘实例名称 */
	name: string;
}

// 用户奖品接口
export interface UserPrize {
	/** 用户奖品ID */
	id: number;
	/** 奖品信息 */
	prize: Prize;
	/** 状态 */
	status: string;
	/** 状态显示 */
	status_display: string;
	/** 领取类型 */
	claim_type: string | null;
	/** 领取时间 */
	claimed_at: string | null;
	/** 创建时间 */
	created_at: string;
	/** 更新时间 */
	updated_at: string;
	/** 转盘实例信息 */
	wheel_instance: WheelInstance;
}

// 获取用户奖品列表请求接口
export interface GetUserPrizesRequest {
	/** 转盘实例ID（可选，用于过滤特定转盘的奖品） */
	wheel_instance_id?: number;
}

// API响应接口
export interface ApiResponse<T> {
	/** 响应代码 */
	code: number;
	/** 响应消息 */
	message: string;
	/** 响应数据 */
	data: T;
}

// 获取用户奖品列表响应接口
export interface GetUserPrizesData {
	/** 用户奖品列表 */
	prizes: UserPrize[];
	/** 总数 */
	total_count: number;
}

export type GetUserPrizesResponse = ApiResponse<GetUserPrizesData>;

// 领取奖品响应接口
export interface ClaimPrizeResponse {
	/** 用户奖品ID */
	id: number;
	/** 奖品信息 */
	prize: Prize;
	/** 状态 */
	status: string;
	/** 状态显示 */
	status_display: string;
	/** 领取类型 */
	claim_type: string;
	/** 领取时间 */
	claimed_at: string;
}

// 领取奖品请求接口
export interface ClaimPrizeRequest {
	/** 用户奖品ID */
	user_prize_id: number;
	/** 领取方式：physical_delivery（实物配送）或 cash_payout（现金提现） */
	claim_type: 'physical_delivery' | 'cash_payout';
	/** 收货地址信息（当claim_type为physical_delivery时必填） */
	delivery_address?: {
		/** 收货人姓名 */
		name: string;
		/** 收货人电话 */
		phone: string;
		/** 收货地址 */
		address: string;
		/** 邮政编码 */
		postal_code?: string;
	};
	/** 提现账户信息（当claim_type为cash_payout时必填） */
	cash_account?: {
		/** 账户类型：bank（银行卡）或 alipay（支付宝）或 wechat（微信） */
		account_type: 'bank' | 'alipay' | 'wechat';
		/** 账户信息 */
		account_info: string;
	};
}

// API路径枚举
export enum PrizeApi {
	GetUserPrizes = "/api/user-prizes/",
	ClaimPrize = "/api/claim-prize/",
}

// API函数定义
const getUserPrizes = (params?: GetUserPrizesRequest) => 
	apiClient.get<GetUserPrizesData>({ url: PrizeApi.GetUserPrizes, params });

const claimPrize = (data: ClaimPrizeRequest) => 
	apiClient.post<ClaimPrizeResponse>({ url: PrizeApi.ClaimPrize, data });

export default {
	getUserPrizes,
	claimPrize,
}; 
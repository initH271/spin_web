import apiClient from "./apiClient";

// 用户认证相关类型定义
export interface User {
    id: number;
    email: string;
    email_verified: boolean;
    last_login_at: string | null;
    date_joined: string;
    is_active: boolean;
  }

export interface TokenResponse {
	/** 访问令牌 */
	access: string;
	/** 刷新令牌 */
	refresh: string;
}

export interface AuthResponseData {
	/** 用户信息 */
	user: User;
	/** JWT令牌 */
	tokens: TokenResponse;
}

// 注册相关接口
export interface RegisterRequest {
	/** 邮箱地址 */
	email: string;
	/** 密码，最少6位 */
	password: string;
	/** 邮箱验证码 */
	verification_code: string;
}

export interface RegisterResponse {
	/** 用户信息 */
	user: User;
	/** JWT令牌 */
	tokens: TokenResponse;
}

// 登录相关接口
export interface LoginRequest {
	/** 邮箱地址 */
	email: string;
	/** 密码 */
	password: string;
}

export interface LoginResponse {
	/** 用户信息 */
	user: User;
	/** JWT令牌 */
	tokens: TokenResponse;
}

// 邮箱验证相关接口
export interface VerifyEmailRequest {
	/** 邮箱地址 */
	email: string;
	/** 验证码 */
	code: string;
}

// 发送验证码相关接口
export interface SendVerificationRequest {
	/** 邮箱地址 */
	email: string;
}

export interface VerificationResponseData {
	/** 邮箱地址 */
	email: string;
	/** 验证码有效期（秒） */
	expires_in: number;
}

export interface VerificationResponse {
	/** 验证码响应数据 */
	data: VerificationResponseData;
}

// 重置密码相关接口
export interface ResetPasswordRequest {
	/** 邮箱地址 */
	email: string;
	/** 验证码 */
	code: string;
	/** 新密码，最少6位 */
	password: string;
	/** 确认新密码 */
	confirm_password: string;
}

// API路径枚举
export enum AuthApi {
	Register = "/api/register/",
	Login = "/api/login/",
	Logout = "/api/logout/",
	VerifyEmail = "/api/verify-email/",
	SendVerificationCode = "/api/send-verification-code/",
	ForgotPasswordSendCode = "/api/forgot-password-send-code/",
	ResetPassword = "/api/reset-password/",
}

// API函数定义
const register = (data: RegisterRequest) => 
	apiClient.post<RegisterResponse>({ url: AuthApi.Register, data });

const login = (data: LoginRequest) => 
	apiClient.post<LoginResponse>({ url: AuthApi.Login, data });

const logout = () => 
	apiClient.post({ url: AuthApi.Logout });

const verifyEmail = (data: VerifyEmailRequest) => 
	apiClient.post({ url: AuthApi.VerifyEmail, data });

const sendVerificationCode = (data: SendVerificationRequest) => 
	apiClient.post<VerificationResponse>({ url: AuthApi.SendVerificationCode, data });

const forgotPasswordSendCode = (data: SendVerificationRequest) => 
	apiClient.post<VerificationResponse>({ url: AuthApi.ForgotPasswordSendCode, data });

const resetPassword = (data: ResetPasswordRequest) => 
	apiClient.post({ url: AuthApi.ResetPassword, data });

export default {
	register,
	login,
	logout,
	verifyEmail,
	sendVerificationCode,
	forgotPasswordSendCode,
	resetPassword,
}; 
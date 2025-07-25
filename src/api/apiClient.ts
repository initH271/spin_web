import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse } from "axios";
export interface Result<T = unknown> {
	code: number;
	message: string;
	data: T;
}
const axiosInstance = axios.create({
	baseURL: "https://spin-api.vapeis.com",
	timeout: 50000,
	headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
	(config) => {
		// 从localStorage获取token并添加到请求头
		const token = localStorage.getItem('user-storage');
		if (token) {
			try {
				const userData = JSON.parse(token);
				if (userData.state?.accessToken) {
					config.headers.Authorization = `Bearer ${userData.state.accessToken}`;
				}
			} catch (error) {
				console.error('Failed to parse user storage:', error);
			}
		}
		return config;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(res: AxiosResponse<Result<any>>) => {
		const { code, data, message } = res.data;
		if (code === 0) {
			return data;
		}
		throw new Error(message);
	},
	(error: AxiosError<Result>) => {
		const { response, message } = error || {};
		let errMsg = message || "系统错误";

		// 处理错误响应数据
		if (response?.data) {
			errMsg = response.data.message || errMsg;
		}

		// 不在这里显示toast，让具体的组件处理错误显示
		return Promise.reject(new Error(errMsg));
	},
);

class APIClient {
	get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: "GET" });
	}
	post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: "POST" });
	}
	put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: "PUT" });
	}
	delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: "DELETE" });
	}
	request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
		return axiosInstance.request<any, T>(config);
	}
}

export default new APIClient();

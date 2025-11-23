import http from '../http';

/**
 * 登录请求参数
 */
export interface LoginParams {
  user_name: string;
  password: string;
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  token: string;
  user_id: number;
  user_name: string;
}

/**
 * 登录接口
 * @param params 登录参数
 */
export const login = (params: LoginParams) => {
  return http.post<LoginResponse>('/auth/login', params);
};

/**
 * 登出接口
 */
export const logout = () => {
  return http.post('/auth/logout');
};

/**
 * 获取用户信息
 */
export interface UserInfo {
  user_id: number;
  user_name: string;
  email?: string;
}

export const getUserInfo = () => {
  return http.get<UserInfo>('/auth/user');
};


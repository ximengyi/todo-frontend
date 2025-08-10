/**
 * API响应基础格式
 */
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}
/**
 * Todo项目类型定义
 */
export interface TodoItem {
  id: number;
  content: string;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
}

/**
 * 创建/更新Todo的参数类型
 */
export interface TodoParams {
  sort: number;
  content: string;
  group_id?: number;
}
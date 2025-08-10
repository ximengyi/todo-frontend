/**
 * Todo项目类型定义
 */
export interface TodoItem {
  id: number;
  content: string;
  sort: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pagination<T> {
  list: T[];
  total: number;
  page: number;
  page_size: number;
}


/**
 * 创建/更新Todo的参数类型
 */
export interface TodoParams {
  sort: number;
  content: string;
  group_id?: number;
}
import http from '../http';
import type { TodoItem } from '../types/todoTypes';
import type { TodoParams } from '../types/todoTypes';
import type { Pagination } from '../types/todoTypes';
// 首先在文件顶部导入新的响应类型
import type { ApiResponse } from '../types/response';

// 然后修改getTodoList方法
/**
 * Todo列表接口
 * @param params 查询参数
 */
export const getTodoList = (params?: { page?: number; size?: number }) => {
  // 修改为正确的返回类型
  return http.get<ApiResponse<Pagination<TodoItem>>>('/todos', { params }) as unknown as Promise<Pagination<TodoItem>>;
};

/**
 * 获取单个Todo
 * @param id TodoItem ID
 */
export const getTodoById = (id: string | number) => {
  return http.get<TodoItem>(`/todos/${id}`);
};

/**
 * 创建Todo
 * @param data Todo数据
 */
// 修改前
// export const createTodo = (data: TodoParams) => {
//   return http.post<TodoItem>('/todo', data);
// };

// 修改后
export const createTodo = (data: TodoParams): Promise<any> => {
  return http.post<any>('/todo', data);
};

/**
 * 更新Todo
 * @param id TodoItem ID
 * @param data 更新数据
 */
export const updateTodo = (id: string | number, data: Partial<TodoParams>) => {
  return http.put<TodoItem>(`/todo/${id}`, data);
};

/**
 * 删除Todo
 * @param id Todo ID
 */
export const deleteTodo = (id: string | number) => {
  return http.delete<boolean>(`/todos/${id}`);
};
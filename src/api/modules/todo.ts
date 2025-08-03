import http from '../http';
import type { TodoItem } from '../types/todoTypes';
import type { TodoParams } from '../types/todoTypes';

/**
 * Todo列表接口
 * @param params 查询参数
 */
export const getTodoList = (params?: { page?: number; size?: number }) => {
  return http.get<TodoItem[]>('/todos', { params });
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
export const createTodo = (data: TodoParams) => {
  return http.post<TodoItem>('/todos', data);
};

/**
 * 更新Todo
 * @param id TodoItem ID
 * @param data 更新数据
 */
export const updateTodo = (id: string | number, data: Partial<TodoParams>) => {
  return http.put<TodoItem>(`/todos/${id}`, data);
};

/**
 * 删除Todo
 * @param id Todo ID
 */
export const deleteTodo = (id: string | number) => {
  return http.delete<boolean>(`/todos/${id}`);
};
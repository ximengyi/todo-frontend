import axios from 'axios'

const api = axios.create({
  baseURL: 'http://your-api-endpoint'
})

export const todoApi = {
  getAll: () => api.get('/todos'),
  create: (todo) => api.post('/todos', todo),
  update: (id, todo) => api.put(`/todos/${id}`, todo),
  delete: (id) => api.delete(`/todos/${id}`),
  toggleComplete: (id) => api.patch(`/todos/${id}/toggle`)
} 
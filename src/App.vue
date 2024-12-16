<template>
  <div class="container">
    <h1>Todo List</h1>
    
    <div class="add-todo">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="添加新的待办事项..."
      >
      <base-button @click="addTodo">添加</base-button>
    </div>

    <Calendar :todos="todos" />

    <div class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { todoApi } from './services/api'
import Calendar from './components/Calendar.vue'
import TodoItem from './components/TodoItem.vue'
import BaseButton from './components/BaseButton.vue'

const todos = ref([])
const newTodo = ref('')

onMounted(async () => {
  try {
    const response = await todoApi.getAll()
    todos.value = response.data
  } catch (error) {
    console.error('Failed to fetch todos:', error)
  }
})

const addTodo = async () => {
  if (!newTodo.value.trim()) return
  
  try {
    const response = await todoApi.create({
      text: newTodo.value,
      completed: false,
      date: new Date().toISOString()
    })
    todos.value.push(response.data)
    newTodo.value = ''
  } catch (error) {
    console.error('Failed to add todo:', error)
  }
}

const toggleTodo = async (id) => {
  try {
    await todoApi.toggleComplete(id)
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  } catch (error) {
    console.error('Failed to toggle todo:', error)
  }
}

const deleteTodo = async (id) => {
  try {
    await todoApi.delete(id)
    todos.value = todos.value.filter(t => t.id !== id)
  } catch (error) {
    console.error('Failed to delete todo:', error)
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 20px;
}
</style>

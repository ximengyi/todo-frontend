<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
    >
    <span class="todo-text">{{ todo.text }}</span>
    <div class="todo-actions">
      <base-button
        type="danger"
        @click="$emit('delete', todo.id)"
      >
        删除
      </base-button>
    </div>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.todo-text {
  flex: 1;
  margin: 0 12px;
}

.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.todo-actions {
  display: flex;
  gap: 8px;
}
</style> 
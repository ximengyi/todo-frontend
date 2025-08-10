<template>
  <div class="todo-item" :class="{ done: item.status }">
    <span class="drag-handle" title="拖动排序">☰</span>
    <el-checkbox v-model:checked="item.status" @change="onToggle" />
    <span class="todo-text" @click="onToggle">{{ item.content }}</span>
    <el-button type="text" danger @click="onRemove">删除</el-button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
// import type { todoAPI } from '../api'
import type { TodoItem } from '../api';
const props = defineProps<{
  item: TodoItem
}>()

const emit = defineEmits(['toggle', 'remove','dateChange'])

function onToggle() {
  emit('toggle', props.item.id)
}
function onRemove() {
  emit('remove', props.item.id)
}
function onDateChange() {
  emit('dateChange', props.item.id)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: 1.1rem;
  border-bottom: 1px solid #f0f0f0;
  background: transparent;
  transition: background 0.2s;
  user-select: none;
}
.todo-item:last-child {
  border-bottom: none;
}
.todo-item .drag-handle {
  cursor: grab;
  margin-right: 12px;
  color: #bbb;
  font-size: 1.2em;
}
.todo-item.done .todo-text {
  text-decoration: line-through;
  color: #aaa;
}
.todo-text {
  margin-left: 12px;
  flex: 1;
  cursor: pointer;
  transition: color 0.2s;
}
</style>

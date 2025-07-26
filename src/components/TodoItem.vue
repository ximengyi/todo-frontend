<template>
  <div class="todo-item" :class="{ done: item.done }">
    <span class="drag-handle" title="拖动排序">☰</span>
    <a-checkbox v-model:checked="item.done" @change="onToggle" />
    <span class="todo-text" @click="onToggle">{{ item.text }}</span>
    <a-button type="link" danger @click="onRemove">删除</a-button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{
  item: { id: number; text: string; done: boolean }
}>()
const emit = defineEmits(['toggle', 'remove'])

function onToggle() {
  emit('toggle', props.item.id)
}
function onRemove() {
  emit('remove', props.item.id)
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

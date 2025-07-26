<template>
  <div class="todo-input-row">
    <el-input
      v-model="inputValue"
      placeholder="添加新的待办事项..."
      @keyup.enter="onAdd"
      class="todo-input"
    />
    <el-button type="primary" class="todo-add-btn green-btn" @click="onAdd">添加</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue', 'add'])

const inputValue = ref(props.modelValue)
watch(
  () => props.modelValue,
  (v) => (inputValue.value = v),
)

function onAdd() {
  if (!inputValue.value.trim()) return
  emit('add', inputValue.value)
  emit('update:modelValue', '')
  inputValue.value = ''
}
watch(inputValue, (v) => emit('update:modelValue', v))
</script>

<style scoped>
.todo-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.todo-input {
  flex: 1;
  height: 38px;
  font-size: 1rem;
}
.todo-add-btn {
  height: 38px;
  font-size: 1rem;
}
.green-btn {
  background: #52c41a !important;
  border-color: #52c41a !important;
}
.green-btn:hover,
.green-btn:focus {
  background: #389e0d !important;
  border-color: #389e0d !important;
}
</style>

<template>
  <button
    class="base-button"
    :class="type"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'danger', 'success'].includes(value)
  }
})
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.primary {
  background-color: #4CAF50;
  color: white;
}

.danger {
  background-color: #f44336;
  color: white;
}

.success {
  background-color: #2196F3;
  color: white;
}
</style> 
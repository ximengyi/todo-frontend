<template>
  <div class="calendar-wrapper">
    <el-calendar v-model="value">
      <template #date-cell="{ data }">
        <div class="custom-date-cell">
          <span class="date-num">{{ data.day.split('-')[2] }}</span>
          <span v-if="getDotColor(data.day) === 'green'" class="dot green-dot"></span>
          <span v-else-if="getDotColor(data.day) === 'red'" class="dot red-dot"></span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'

const value = ref(new Date())
const events = reactive([
  { date: '2025-07-05', status: true },
  { date: '2025-07-12', status: false },
])

function getDotColor(day: string): '' | 'green' | 'red' {
  const event = events.find((e) => e.date === day)
  if (!event) return ''
  return event.status ? 'green' : 'red'
}
</script>

<style scoped>
.custom-date-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 32px;
}
.date-num {
  font-size: 14px;
  line-height: 1;
}
.dot {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 4px;
}
.green-dot {
  background: #52c41a;
}
.red-dot {
  background: #ff4d4f;
}
.calendar-wrapper {
  width: 100%;
  max-width: 420px;
  min-width: 260px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}
:deep(.el-calendar) {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
:deep(.el-calendar__body) {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
}
:deep(.el-calendar-table) {
  flex: 1 1 0%;
  height: 100%;
}
:deep(.el-calendar-table .el-calendar-day) {
  aspect-ratio: 1 / 1;
  height: auto;
  min-width: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

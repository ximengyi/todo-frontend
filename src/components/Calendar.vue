<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="previousMonth">&lt;</button>
      <h3>{{ currentYear }}年 {{ currentMonth + 1 }}月</h3>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-grid">
      <div class="weekday" v-for="day in weekDays" :key="day">{{ day }}</div>
      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="calendar-day"
        :class="getDayClass(day)"
      >
        {{ day.dayOfMonth }}
        <span 
          v-if="day.hasTodos" 
          class="todo-indicator"
          :class="{ 'completed': day.allCompleted }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils'

const props = defineProps({
  todos: {
    type: Array,
    required: true
  }
})

const currentDate = ref(new Date())
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const calendarDays = computed(() => {
  const days = []
  const daysInMonth = getDaysInMonth(currentYear.value, currentMonth.value)
  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value)

  // Add empty days for padding
  for (let i = 0; i < firstDay; i++) {
    days.push({ isEmpty: true })
  }

  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    const todosForDay = props.todos.filter(todo => {
      const todoDate = new Date(todo.date)
      return todoDate.toDateString() === date.toDateString()
    })

    days.push({
      date,
      dayOfMonth: i,
      hasTodos: todosForDay.length > 0,
      allCompleted: todosForDay.length > 0 && todosForDay.every(todo => todo.completed)
    })
  }

  return days
})

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1)
}

const getDayClass = (day) => {
  return {
    'empty': day.isEmpty,
    'has-todos': day.hasTodos
  }
}
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #ddd;
}

.weekday {
  background-color: #f5f5f5;
  padding: 8px;
  text-align: center;
  font-weight: bold;
}

.calendar-day {
  background-color: white;
  padding: 8px;
  min-height: 80px;
  position: relative;
}

.empty {
  background-color: #f9f9f9;
}

.todo-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f44336;
}

.todo-indicator.completed {
  background-color: #4CAF50;
}
</style> 
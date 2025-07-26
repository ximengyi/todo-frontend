<template>
  <div id="components-grid-demo-flex">
    <!-- <ElDivider-divider orientation="left"></a-divider> -->
    <!-- <ElDivider class="divider-top" orientation="left"></ElDivider> -->
    <el-row class="content-row" justify="space-evenly">
      <el-col :span="4">
        <CalendarElement />
      </el-col>
      <el-col :span="14" wrap="false">
        <el-row :span="1" class="todo-title"> Todo List </el-row>

        <TodoInput v-model="newTodo" @add="addTodo" />
        <div class="todo-divider"></div>
        <!-- <a-row :span="18" class="todo-list-title"> -->
        <draggable
          v-model="todos"
          item-key="id"
          animation="200"
          handle=".drag-handle"
          class="todo-list"
        >
          <template #item="{ element }">
            <TodoItem :item="element" @toggle="toggleTodo" @remove="removeTodo" />
          </template>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import draggable from 'vuedraggable'
import CalendarElement from '../components/CalendarElement.vue'
import TodoInput from '../components/TodoInput.vue'
import TodoItem from '../components/TodoItem.vue'
// import { ElDivider } from 'element-plus'

// Todo 类型
interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const selectedDate = ref<Dayjs>(dayjs())
const newTodo = ref('')
const todos = ref<TodoItemType[]>([])

// 日历状态，key为日期字符串，值为'finished'|'unfinished'
const calendarStatus = ref<Record<string, 'finished' | 'unfinished'>>({})

// 模拟后端接口
function fetchTodos(date: Dayjs) {
  todos.value = [
    { id: 1, text: '示例待办1', done: false },
    { id: 2, text: '示例待办2', done: true },
  ]
}
function fetchMonthStatus(date: Dayjs) {
  calendarStatus.value = {
    [date.format('YYYY-MM-15')]: 'unfinished',
    [date.format('YYYY-MM-16')]: 'finished',
  }
}

function onSelectDate(date: Dayjs) {
  selectedDate.value = date
  fetchTodos(date)
}

function addTodo(text: string) {
  if (!text.trim()) return
  todos.value.push({
    id: Date.now(),
    text,
    done: false,
  })
  newTodo.value = ''
}

function removeTodo(id: number) {
  todos.value = todos.value.filter((item) => item.id !== id)
}

function toggleTodo(id: number) {
  const todo = todos.value.find((item) => item.id === id)
  if (todo) todo.done = !todo.done
}

// 日历渲染红点/绿点
function dateCellRender(date: Date) {
  const key = dayjs(date).format('YYYY-MM-DD')
  if (calendarStatus.value[key] === 'unfinished') {
    return h('span', { class: 'dot dot-red' })
  }
  if (calendarStatus.value[key] === 'finished') {
    return h('span', { class: 'dot dot-green' })
  }
  return null
}

onMounted(() => {
  fetchTodos(selectedDate.value)
  fetchMonthStatus(selectedDate.value)
})
</script>

<style lang="less" scoped>
.content-row {
  margin-top: 4%;
}

.todo-bg {
  display: flex;
  gap: 10%;
  align-items: flex-start;
}

.todo-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  margin-top: 10px;
  color: #2c2a2a;
}

.todo-divider {
  height: 2px;
  background: #e0e0e0;
  margin: 24px 0;
}

.todo-list {
  min-height: 300px;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 auto;
}
.dot-red {
  background: #ff4d4f;
}
.dot-green {
  background: #52c41a;
}

.vertical-divider {
  width: 1px;
  height: 90%;
  background: #e0e0e0;
  margin: 0 8px;
  align-self: stretch;
  border-radius: 1px;
}

.calendar-wrapper {
  width: 100%;
  max-width: 420px; /* 增大最大宽度 */
  min-width: 260px; /* 增大最小宽度 */
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 24px; /* 增大内边距 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}
</style>

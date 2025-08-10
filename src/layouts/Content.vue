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
          // 修改组件导入为别名
          import TodoItemComponent from '../components/TodoItem.vue'
          import type {TodoItem} from '../api/index'
          
          // 在模板中使用新的组件名称
          <template #item="{ element }">
            <Todo :item="element" @toggle="toggleTodo" @remove="removeTodo" />
          </template>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h, reactive } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import draggable from 'vuedraggable'
import CalendarElement from '../components/CalendarElement.vue'
import TodoInput from '../components/TodoInput.vue'
import Todo from '../components/Todo.vue'
import type {TodoItem} from '../api/index'
import { todoAPI, } from '../api'


// Todo
// Todo 类型
// interface TodoItemType {
//   id: number
//   text: string
//   done: boolean
// }

const selectedDate = ref<Dayjs>(dayjs())
const newTodo = ref('')
const todos = reactive<TodoItem[]>([])

// 日历状态，key为日期字符串，值为'finished'|'unfinished'
const calendarStatus = ref<Record<string, 'finished' | 'unfinished'>>({})

// 模拟后端接口
// 修改为异步方法
async function fetchTodos(date: Dayjs) {
  console.log('fetchTodos called with date:', date);
  try {
    // 调用API获取数据
    const response = await todoAPI.getTodoList({
      page: 1,
      size: 15
    });
    
    // 处理响应数据
    // 清空数组并添加新数据
     todos.length = 0;
     todos.push(...response.list.map(item => ({
       id: item.id,
       content: item.content,
       status: Boolean(item.status),
       sort: item.sort,
       created_at: item.created_at,
       updated_at: item.updated_at
     })));
    
    console.log('todos after fetch:', todos);
  } catch (error) {
    console.error('获取待办列表失败:', error);
    // 错误处理，例如显示提示信息
    // ElMessage.error('获取待办列表失败');
  }
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

async function addTodo(text: string) {
  if (!text.trim()) return;
  try {
    const newTodoItem = await todoAPI.createTodo({
      content: text,
      sort: 0,
      group_id: 0,
    });
    console.log('new todo item ', newTodoItem)
    todos.push({
      id: newTodoItem.id,  // 直接访问id
      content: newTodoItem.content,
      sort: newTodoItem.sort,
      status: newTodoItem.status,
      created_at: newTodoItem.created_at,
      updated_at: newTodoItem.updated_at,
    });
    newTodo.value = '';
    // ElMessage.success('待办项添加成功'); // 可选：添加成功提示
  } catch (error) {
    console.error('添加待办失败:', error instanceof Error ? error.message : JSON.stringify(error));
  }
}

function removeTodo(id: number) {
  todos.splice(0, todos.length, ...todos.filter((item) => item.id !== id))
}

function toggleTodo(id: number) {
  const todo = todos.find((item) => item.id === id)
  if (todo) todo.status = !todo.status

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

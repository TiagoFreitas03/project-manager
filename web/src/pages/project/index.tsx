import { Header } from './header'
import { TasksColumn } from './tasks-column'

const statuses = ['todo', 'doing', 'done']

const tasks = Array.from({ length: 21 }).map((_, index) => {
  return {
    name: `Task ${index + 1}`,
    status: statuses[index % 3],
    priority: (index % 3) + 1,
    createdAt: new Date(2025, 1, 1),
    updatedAt: new Date(2025, 1, 10),
  }
})

const todoTasks = tasks.filter((task) => task.status === 'todo')
const doingTasks = tasks.filter((task) => task.status === 'doing')
const doneTasks = tasks.filter((task) => task.status === 'done')

export function Project() {
  return (
    <>
      <Header />

      <div className="grid grid-cols-3 mt-2 gap-2">
        <TasksColumn status="todo" tasks={todoTasks} />
        <TasksColumn status="doing" tasks={doingTasks} />
        <TasksColumn status="done" tasks={doneTasks} />
      </div>
    </>
  )
}

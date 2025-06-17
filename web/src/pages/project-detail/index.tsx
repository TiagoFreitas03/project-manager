import { Header } from './header'
import { TasksColumn } from './tasks-column'

const tasks = [
  { name: 'Task 1', status: 'todo', priority: 1 },
  { name: 'Task 2', status: 'doing', priority: 1 },
  { name: 'Task 3', status: 'done', priority: 2 },
  { name: 'Task 4', status: 'todo', priority: 2 },
  { name: 'Task 5', status: 'done', priority: 3 },
  { name: 'Task 6', status: 'todo', priority: 3 },
  { name: 'Task 7', status: 'doing', priority: 3 },
  { name: 'Task 8', status: 'done', priority: 3 },
  { name: 'Task 9', status: 'todo', priority: 1 },
  { name: 'Task 10', status: 'done', priority: 1 },
  { name: 'Task 11', status: 'todo', priority: 2 },
  { name: 'Task 12', status: 'doing', priority: 2 },
  { name: 'Task 13', status: 'done', priority: 1 },
  { name: 'Task 14', status: 'todo', priority: 2 },
  { name: 'Task 15', status: 'done', priority: 3 },
  { name: 'Task 16', status: 'todo', priority: 3 },
  { name: 'Task 17', status: 'doing', priority: 3 },
  { name: 'Task 18', status: 'done', priority: 3 },
  { name: 'Task 19', status: 'todo', priority: 1 },
]

const todoTasks = tasks.filter((task) => task.status === 'todo')
const doingTasks = tasks.filter((task) => task.status === 'doing')
const doneTasks = tasks.filter((task) => task.status === 'done')

export function ProjectDetail() {
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

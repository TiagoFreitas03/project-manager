import { fetchProjectTasks } from '@/api/fetch-project-tasks'
import { useQuery } from '@tanstack/react-query'
import { TasksColumn } from './tasks-column'

interface TasksBoardProps {
  projectId: string
}

export function TasksBoard({ projectId }: TasksBoardProps) {
  const { data: tasks } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => fetchProjectTasks(projectId),
  })

  if (!tasks) {
    return <></>
  }

  const { toDoTasks, doingTasks, doneTasks } = tasks
  const tasksAmount = toDoTasks.length + doingTasks.length + doneTasks.length

  return tasksAmount === 0 ? (
    <div className="flex justify-center items-center min-h-[90%] border rounded mt-4">
      <span>Nenhuma tarefa encontrada.</span>
    </div>
  ) : (
    <div className="grid grid-cols-3 mt-2 gap-2">
      <TasksColumn status={'TO_DO'} tasks={toDoTasks} />

      <TasksColumn status={'DOING'} tasks={doingTasks} />

      <TasksColumn status={'DONE'} tasks={doneTasks} />
    </div>
  )
}

import type { Task } from '@/interfaces/task'
import { api } from '@/lib/axios'

interface FetchProjectTasksResponse {
  toDoTasks: Task[]
  doingTasks: Task[]
  doneTasks: Task[]
}

export async function fetchProjectTasks(projectId: string, archived = false) {
  const response = await api.get<FetchProjectTasksResponse>(
    `/projects/${projectId}/tasks`,
    {
      params: {
        archived,
      },
    },
  )

  return response.data
}

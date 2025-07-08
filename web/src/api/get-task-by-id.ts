import type { TaskDetails } from '@/interfaces/task-details'
import { api } from '@/lib/axios'

interface GetTaskByIdResponse {
  task: TaskDetails
}

export async function getTaskById(id: string) {
  const response = await api.get<GetTaskByIdResponse>(`/tasks/${id}`)

  return response.data.task
}

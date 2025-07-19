import type { Task } from '@/interfaces/task'
import { api } from '@/lib/axios'

interface CreateTaskRequest {
  name: string
  description: string
  priority: number
  projectId: string
}

interface CreateTaskResponse {
  task: Task
}

export async function createTask(data: CreateTaskRequest) {
  const response = await api.post<CreateTaskResponse>('/tasks', { ...data })

  return response.data
}

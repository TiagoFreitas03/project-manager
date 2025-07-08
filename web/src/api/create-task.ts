import { api } from '@/lib/axios'

interface CreateTaskData {
  name: string
  description: string
  priority: number
  projectId: string
}

export async function createTask(data: CreateTaskData) {
  await api.post('/tasks', { ...data })
}

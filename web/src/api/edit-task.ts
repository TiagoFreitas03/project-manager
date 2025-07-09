import { api } from '@/lib/axios'

interface EditTaskData {
  id: string
  name: string
  description: string
  priority: number
}

export async function editTask({ id, ...data }: EditTaskData) {
  await api.put(`/tasks/${id}`, { ...data })
}

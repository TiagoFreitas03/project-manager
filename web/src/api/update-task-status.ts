import { api } from '@/lib/axios'

interface UpdateTaskStatusData {
  id: string
  status: string
}

export async function updateTaskStatus({ id, status }: UpdateTaskStatusData) {
  await api.patch(`/tasks/${id}/status`, { status })
}

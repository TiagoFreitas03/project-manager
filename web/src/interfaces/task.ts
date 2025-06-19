import type { Status } from '@/types/status'

export interface Task {
  id: string
  name: string
  status: Status
  priority: number
  createdAt: Date
  updatedAt: Date
}

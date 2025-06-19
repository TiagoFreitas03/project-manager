import type { Status } from '@/types/status'

export interface ProjectSummary {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  status: Status
  slug: string
  progress: number
}

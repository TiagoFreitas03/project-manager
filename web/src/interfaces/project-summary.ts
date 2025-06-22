import type { Status } from '@/enums/status'

export interface ProjectSummary {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  status: Status
  slug: string
  progress: number
}

// import type { ProjectSummary } from '@/interfaces/project-summary'
import { api } from '@/lib/axios'

interface CreateProjectData {
  name: string
  description: string
  repositoryUrl: string
}

export async function createProject(data: CreateProjectData) {
  await api.post('/projects', { ...data })
}

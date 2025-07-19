import type { Project } from '@/interfaces/project'
import { api } from '@/lib/axios'

interface CreateProjectRequest {
  name: string
  description: string
  repositoryUrl: string
}

interface CreateProjectResponse {
  project: Project
}

export async function createProject(data: CreateProjectRequest) {
  const response = await api.post<CreateProjectResponse>('/projects', {
    ...data,
  })

  return response.data
}

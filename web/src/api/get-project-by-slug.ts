import type { Project } from '@/interfaces/project'
import { api } from '@/lib/axios'

interface GetProjectBySlugResponse {
  project: Project
}

export async function getProjectBySlug(slug: string) {
  const response = await api.get<GetProjectBySlugResponse>(`/projects/${slug}`)

  return response.data.project
}

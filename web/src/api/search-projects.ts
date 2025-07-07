import type { ProjectSummary } from '@/interfaces/project-summary'
import { api } from '@/lib/axios'

interface SearchProjectsFilters {
  name?: string
  page?: number
  orderBy?: string
}

interface SearchProjectsResponse {
  projects: ProjectSummary[]
  pages: number
}

export async function searchProjects({
  name,
  page,
  orderBy,
}: SearchProjectsFilters) {
  const order = orderBy === 'name' ? 'asc' : 'desc'

  const response = await api.get<SearchProjectsResponse>('/projects', {
    params: {
      name,
      page,
      orderBy,
      order,
    },
  })

  return response.data
}

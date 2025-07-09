import { api } from '@/lib/axios'

interface UpdateProjectData {
  id: string
  description: string
  repositoryUrl: string
}

export async function editProject({ id, ...data }: UpdateProjectData) {
  await api.put(`/projects/${id}`, { ...data })
}

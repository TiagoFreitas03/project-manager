import { EditProjectUseCase } from '@/domain/use-cases/edit-project'
import { PrismaProjectsRepository } from '../repositories/prisma-projects-repository'

export function makeEditProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const useCase = new EditProjectUseCase(projectsRepository)

  return useCase
}

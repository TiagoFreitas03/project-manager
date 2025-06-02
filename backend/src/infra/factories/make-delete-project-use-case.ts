import { DeleteProjectUseCase } from '@/domain/use-cases/delete-project'
import { PrismaProjectsRepository } from '../repositories/prisma-projects-repository'

export function makeDeleteProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const useCase = new DeleteProjectUseCase(projectsRepository)

  return useCase
}

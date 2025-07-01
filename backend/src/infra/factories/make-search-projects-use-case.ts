import { SearchProjectsUseCase } from '@/domain/use-cases/search-projects'
import { PrismaProjectsRepository } from '../repositories/prisma-projects-repository'

export function makeSearchProjectsUseCase() {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new SearchProjectsUseCase(projectsRepository)

  return useCase
}

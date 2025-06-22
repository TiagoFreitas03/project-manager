import { SearchProjectsUseCase } from '@/domain/use-cases/search-projects'
import { PrismaProjectsRepository } from '../repositories/prisma-projects-repository'
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'

export function makeSearchProjectsUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const tasksRepository = new PrismaTasksRepository()

  const useCase = new SearchProjectsUseCase(projectsRepository, tasksRepository)

  return useCase
}

import { GetProjectBySlugUseCase } from '@/domain/use-cases/get-project-by-slug'
import { PrismaProjectsRepository } from '../repositories/prisma-projects-repository'

export function makeGetProjectBySlugUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const useCase = new GetProjectBySlugUseCase(projectsRepository)

  return useCase
}

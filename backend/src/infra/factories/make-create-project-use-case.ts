import { CreateProjectUseCase } from '@/domain/use-cases/create-project'
import { PrismaProjectsRepository } from '../repositories/prisma-projects-repository'

export function makeCreateProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const useCase = new CreateProjectUseCase(projectsRepository)

  return useCase
}

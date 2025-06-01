import { CreateTaskUseCase } from '@/domain/use-cases/create-task'
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'
import { PrismaProjectsRepository } from '../repositories/prisma-projects-repository'

export function makeCreateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new CreateTaskUseCase(tasksRepository, projectsRepository)

  return useCase
}

import { FetchProjectTasksUseCase } from '@/domain/use-cases/fetch-project-tasks'
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'

export function makeFetchProjectTasksUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new FetchProjectTasksUseCase(tasksRepository)

  return useCase
}

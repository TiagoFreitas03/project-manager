import { DeleteTaskUseCase } from '@/domain/use-cases/delete-task'
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'

export function makeDeleteTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new DeleteTaskUseCase(tasksRepository)

  return useCase
}

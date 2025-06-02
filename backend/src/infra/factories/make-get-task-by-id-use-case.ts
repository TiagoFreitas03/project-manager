import { GetTaskByIdUseCase } from '@/domain/use-cases/get-task-by-id'
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'

export function makeGetTaskByIdUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new GetTaskByIdUseCase(tasksRepository)

  return useCase
}

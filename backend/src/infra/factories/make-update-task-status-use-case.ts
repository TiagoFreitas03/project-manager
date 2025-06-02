import { UpdateTaskStatusUseCase } from '@/domain/use-cases/update-task-status'
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'

export function makeUpdateTaskStatusUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new UpdateTaskStatusUseCase(tasksRepository)

  return useCase
}

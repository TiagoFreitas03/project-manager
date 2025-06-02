import { EditTaskUseCase } from '@/domain/use-cases/edit-task'
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'

export function makeEditTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository()
  const useCase = new EditTaskUseCase(tasksRepository)

  return useCase
}

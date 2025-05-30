import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface GetTaskByIdUseCaseRequest {
  taskId: string
}

type GetTaskByIdUseCaseResponse = Either<ResourceNotFoundError, { task: Task }>

export class GetTaskByIdUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: GetTaskByIdUseCaseRequest): Promise<GetTaskByIdUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    return right({ task })
  }
}

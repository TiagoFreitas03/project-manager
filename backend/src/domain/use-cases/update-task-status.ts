import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { InvalidTaskStatusError } from './errors/invalid-task-status-error'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'
import { stringToStatus } from '../utils/string-to-task-status'

interface UpdateTaskStatusUseCaseRequest {
  taskId: string
  status: string
}

type UpdateTaskStatusUseCaseResponse = Either<
  ResourceNotFoundError | InvalidTaskStatusError,
  { task: Task }
>

export class UpdateTaskStatusUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    status,
  }: UpdateTaskStatusUseCaseRequest): Promise<UpdateTaskStatusUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    const taskStatus = stringToStatus(status)

    if (!taskStatus) {
      return left(new InvalidTaskStatusError(status))
    }

    task.status = taskStatus

    await this.tasksRepository.save(task)

    return right({ task })
  }
}

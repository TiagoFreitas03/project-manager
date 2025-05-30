import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { InvalidPriorityError } from './errors/invalid-priority-error'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface EditTaskUseCaseRequest {
  taskId: string
  name: string
  description: string
  priority: number
}

type EditTaskUseCaseResponse = Either<
  ResourceNotFoundError | InvalidPriorityError,
  { task: Task }
>

export class EditTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    name,
    description,
    priority,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    if (priority < 1 || priority > 3) {
      return left(new InvalidPriorityError())
    }

    task.name = name
    task.description = description
    task.priority = priority

    await this.tasksRepository.save(task)

    return right({ task })
  }
}

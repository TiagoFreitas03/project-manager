import { Either, left, right } from '@/core/either'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'
import { ProjectsRepository } from '../repositories/projects-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { TaskStatus } from '../entities/value-objects/task-status'
import { InvalidPriorityError } from './errors/invalid-priority-error'

interface CreateTaskUseCaseRequest {
  projectId: string
  name: string
  description: string
  priority: number
}

type CreateTaskUseCaseResponse = Either<
  ResourceNotFoundError | InvalidPriorityError,
  { task: Task }
>

export class CreateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({
    projectId,
    name,
    description,
    priority,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const projectExists = await this.projectsRepository.findById(projectId)

    if (!projectExists) {
      return left(new ResourceNotFoundError())
    }

    if (priority < 1 || priority > 3) {
      return left(new InvalidPriorityError())
    }

    const task = Task.create({
      projectId: new UniqueEntityId(projectId),
      name,
      description,
      status: TaskStatus.TO_DO,
      priority,
    })

    await this.tasksRepository.create(task)

    return right({ task })
  }
}

import { Either, right } from '@/core/either'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface FetchProjectTasksUseCaseRequest {
  projectId: string
  archived: boolean
}

type FetchProjectTasksUseCaseResponse = Either<null, { tasks: Task[] }>

export class FetchProjectTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    projectId,
    archived,
  }: FetchProjectTasksUseCaseRequest): Promise<FetchProjectTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findManyByProjectId(
      projectId,
      archived,
    )

    return right({ tasks })
  }
}

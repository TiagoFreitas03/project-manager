import { Either, right } from '@/core/either'
import { Task } from '../entities/task'
import { TasksRepository } from '../repositories/tasks-repository'

interface FetchProjectTasksUseCaseRequest {
  projectId: string
}

type FetchProjectTasksUseCaseResponse = Either<null, { tasks: Task[] }>

export class FetchProjectTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    projectId,
  }: FetchProjectTasksUseCaseRequest): Promise<FetchProjectTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findManyByProjectId(projectId)

    return right({ tasks })
  }
}

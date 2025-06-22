import { Either, right } from '@/core/either'
import {
  OrderProjectsBy,
  ProjectsRepository,
} from '../repositories/projects-repository'
import { Order } from '@/core/types/order'
import { ProjectSummary } from '../entities/value-objects/project-summary'
import { Status } from '../entities/value-objects/status'
import { TasksRepository } from '../repositories/tasks-repository'

interface SearchProjectsUseCaseRequest {
  name?: string
  page?: number
  orderBy?: OrderProjectsBy
  order?: Order
}

type SearchProjectsUseCaseResponse = Either<
  null,
  { projects: ProjectSummary[] }
>

export class SearchProjectsUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private tasksRepository: TasksRepository,
  ) {}

  async execute({
    name,
    page = 1,
    orderBy = 'name',
    order = 'asc',
  }: SearchProjectsUseCaseRequest): Promise<SearchProjectsUseCaseResponse> {
    const projects = await this.projectsRepository.searchMany({
      page,
      name,
      order,
      orderBy,
    })

    const projectsSummary: ProjectSummary[] = []

    for (let i = 0; i < projects.length; i++) {
      const { id, slug, name, createdAt, updatedAt } = projects[i]

      const tasks = await this.tasksRepository.findManyByProjectId(
        id.toString(),
      )
      const tasksAmount = tasks.length
      const doneTasks = tasks.filter((t) => t.status === Status.DONE).length
      const progress = tasksAmount === 0 ? 0 : (doneTasks * 100) / tasksAmount
      const status =
        progress === 100
          ? Status.DONE
          : progress === 0
            ? Status.TO_DO
            : Status.DOING

      projectsSummary.push(
        ProjectSummary.create({
          slug,
          name,
          createdAt,
          updatedAt,
          status,
          progress,
        }),
      )
    }

    return right({ projects: projectsSummary })
  }
}

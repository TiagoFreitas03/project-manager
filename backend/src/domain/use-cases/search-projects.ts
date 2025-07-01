import { Either, right } from '@/core/either'
import {
  ProjectSortableProp,
  ProjectsRepository,
} from '../repositories/projects-repository'
import { Order } from '@/core/types/order'
import { ProjectSummary } from '../entities/value-objects/project-summary'

interface SearchProjectsUseCaseRequest {
  name?: string
  page?: number
  orderBy?: ProjectSortableProp
  order?: Order
}

type SearchProjectsUseCaseResponse = Either<
  null,
  {
    projects: ProjectSummary[]
    pages: number
  }
>

export class SearchProjectsUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    name,
    page = 1,
    orderBy = 'name',
    order = 'asc',
  }: SearchProjectsUseCaseRequest): Promise<SearchProjectsUseCaseResponse> {
    const [projects, projectCount] = await Promise.all([
      this.projectsRepository.searchMany({
        page,
        name,
        order,
        orderBy,
      }),
      this.projectsRepository.count({ name }),
    ])

    return right({
      projects,
      pages: Math.ceil(projectCount / 12),
    })
  }
}

import { Either, right } from '@/core/either'
import { Project } from '../entities/project'
import {
  OrderProjectsBy,
  ProjectsRepository,
} from '../repositories/projects-repository'
import { Order } from '@/core/types/order'

interface SearchProjectsUseCaseRequest {
  name?: string
  page?: number
  orderBy?: OrderProjectsBy
  order?: Order
}

type SearchProjectsUseCaseResponse = Either<null, { projects: Project[] }>

export class SearchProjectsUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

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

    return right({ projects })
  }
}

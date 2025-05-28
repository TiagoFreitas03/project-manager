import { Either, right } from '@/core/either'
import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'

interface CreateProjectUseCaseRequest {
  name: string
  description: string
}

type CreateProjectUseCaseResponse = Either<null, { project: Project }>

export class CreateProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    name,
    description,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const project = Project.create({ name, description })

    await this.projectsRepository.create(project)

    return right({ project })
  }
}

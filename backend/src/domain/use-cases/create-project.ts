import { Either, left, right } from '@/core/either'
import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'
import { isValidHttpUrl } from '../utils/is-valid-http-url'
import { InvalidHttpUrlError } from './errors/invalid-http-url-error'

interface CreateProjectUseCaseRequest {
  name: string
  description: string
  repositoryUrl: string
}

type CreateProjectUseCaseResponse = Either<
  InvalidHttpUrlError,
  { project: Project }
>

export class CreateProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    name,
    description,
    repositoryUrl,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    if (!isValidHttpUrl(repositoryUrl)) {
      return left(new InvalidHttpUrlError(repositoryUrl))
    }

    const project = Project.create({ name, description, repositoryUrl })

    await this.projectsRepository.create(project)

    return right({ project })
  }
}

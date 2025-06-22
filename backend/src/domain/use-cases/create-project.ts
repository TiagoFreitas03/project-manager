import { Either, left, right } from '@/core/either'
import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'
import { isValidHttpUrl } from '../utils/is-valid-http-url'
import { InvalidHttpUrlError } from './errors/invalid-http-url-error'
import { DuplicateProjectNameError } from './errors/duplicate-project-name-error'

interface CreateProjectUseCaseRequest {
  name: string
  description: string
  repositoryUrl: string
}

type CreateProjectUseCaseResponse = Either<
  InvalidHttpUrlError | DuplicateProjectNameError,
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

    const projectExists = await this.projectsRepository.findBySlug(
      project.slug.value,
    )

    if (projectExists) {
      return left(new DuplicateProjectNameError(name))
    }

    await this.projectsRepository.create(project)

    return right({ project })
  }
}

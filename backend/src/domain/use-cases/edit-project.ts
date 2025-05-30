import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'
import { InvalidHttpUrlError } from './errors/invalid-http-url-error'
import { isValidHttpUrl } from '../utils/is-valid-http-url'

interface EditProjectUseCaseRequest {
  projectId: string
  name: string
  description: string
  repositoryUrl: string
}

type EditProjectUseCaseResponse = Either<
  ResourceNotFoundError | InvalidHttpUrlError,
  { project: Project }
>

export class EditProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    projectId,
    name,
    description,
    repositoryUrl,
  }: EditProjectUseCaseRequest): Promise<EditProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      return left(new ResourceNotFoundError())
    }

    if (!isValidHttpUrl(repositoryUrl)) {
      return left(new InvalidHttpUrlError(repositoryUrl))
    }

    project.name = name
    project.description = description
    project.repositoryUrl = repositoryUrl

    await this.projectsRepository.save(project)

    return right({ project })
  }
}

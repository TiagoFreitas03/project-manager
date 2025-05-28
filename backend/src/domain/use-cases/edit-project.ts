import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'

interface EditProjectUseCaseRequest {
  projectId: string
  name: string
  description: string
}

type EditProjectUseCaseResponse = Either<
  ResourceNotFoundError,
  { project: Project }
>

export class EditProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    projectId,
    name,
    description,
  }: EditProjectUseCaseRequest): Promise<EditProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      return left(new ResourceNotFoundError())
    }

    project.name = name
    project.description = description

    await this.projectsRepository.save(project)

    return right({ project })
  }
}

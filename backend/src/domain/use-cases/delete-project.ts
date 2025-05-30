import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ProjectsRepository } from '../repositories/projects-repository'

interface DeleteProjectUseCaseRequest {
  projectId: string
}

type DeleteProjectUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    projectId,
  }: DeleteProjectUseCaseRequest): Promise<DeleteProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      return left(new ResourceNotFoundError())
    }

    await this.projectsRepository.delete(project)

    return right({})
  }
}

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Project } from '../entities/project'
import { ProjectsRepository } from '../repositories/projects-repository'

interface GetProjectBySlugUseCaseRequest {
  slug: string
}

type GetProjectBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  { project: Project }
>

export class GetProjectBySlugUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    slug,
  }: GetProjectBySlugUseCaseRequest): Promise<GetProjectBySlugUseCaseResponse> {
    const project = await this.projectsRepository.findBySlug(slug)

    if (!project) {
      return left(new ResourceNotFoundError())
    }

    return right({ project })
  }
}

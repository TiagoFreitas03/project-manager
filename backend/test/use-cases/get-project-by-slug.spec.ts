import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Slug } from '@/domain/entities/value-objects/slug'
import { GetProjectBySlugUseCase } from '@/domain/use-cases/get-project-by-slug'
import { makeProject } from 'test/factories/make-project'
import { InMemoryProjectsRepository } from 'test/repositories/in-memory-projects-repository'

let projectsRepository: InMemoryProjectsRepository
let sut: GetProjectBySlugUseCase

describe('Get Project By Slug', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new GetProjectBySlugUseCase(projectsRepository)
  })

  it('should be able to get a project by slug', async () => {
    const newProject = makeProject({ slug: Slug.create('example-project') })
    await projectsRepository.create(newProject)

    const result = await sut.execute({ slug: 'example-project' })

    expect(result.value).toHaveProperty('project')
    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      project: expect.objectContaining({
        name: newProject.name,
      }),
    })
  })

  it('should not be able to get an inexistent project by slug', async () => {
    const result = await sut.execute({ slug: 'inexistent-project' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

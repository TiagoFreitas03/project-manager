import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { DeleteProjectUseCase } from '@/domain/use-cases/delete-project'
import { makeProject } from 'test/factories/make-project'
import { InMemoryProjectsRepository } from 'test/repositories/in-memory-projects-repository'

let projectsRepository: InMemoryProjectsRepository
let sut: DeleteProjectUseCase

describe('Delete Project', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new DeleteProjectUseCase(projectsRepository)
  })

  it('should be able to delete a project', async () => {
    const newProject = makeProject({}, new UniqueEntityId('project-1'))

    await projectsRepository.create(newProject)

    await sut.execute({ projectId: 'project-1' })

    expect(projectsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an inexistent project', async () => {
    const result = await sut.execute({ projectId: 'inexistent-project' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

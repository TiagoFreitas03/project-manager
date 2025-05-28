import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditProjectUseCase } from '@/domain/use-cases/edit-project'
import { makeProject } from 'test/factories/make-project'
import { InMemoryProjectsRepository } from 'test/repositories/in-memory-projects-repository'

let projectsRepository: InMemoryProjectsRepository
let sut: EditProjectUseCase

describe('Edit Project', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new EditProjectUseCase(projectsRepository)
  })

  it('should be able to edit a project', async () => {
    const newProject = makeProject({}, new UniqueEntityId('project-1'))

    await projectsRepository.create(newProject)

    await sut.execute({
      projectId: newProject.id.toString(),
      name: 'Edited Project Name',
      description: 'Edited Project Description',
    })

    expect(projectsRepository.items[0]).toMatchObject({
      name: 'Edited Project Name',
      description: 'Edited Project Description',
    })
  })

  it('should not be able to edit an inexistent project', async () => {
    const result = await sut.execute({
      projectId: 'inexistent-project-id',
      name: 'Name',
      description: 'Description',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

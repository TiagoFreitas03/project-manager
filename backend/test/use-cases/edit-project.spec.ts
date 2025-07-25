import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditProjectUseCase } from '@/domain/use-cases/edit-project'
import { InvalidHttpUrlError } from '@/domain/use-cases/errors/invalid-http-url-error'
import { makeProject } from 'test/factories/make-project'
import { InMemoryProjectsRepository } from 'test/repositories/in-memory-projects-repository'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'

let projectsRepository: InMemoryProjectsRepository
let sut: EditProjectUseCase

describe('Edit Project', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository(
      new InMemoryTasksRepository(),
    )
    sut = new EditProjectUseCase(projectsRepository)
  })

  it('should be able to edit a project', async () => {
    const newProject = makeProject({}, new UniqueEntityId('project-1'))

    await projectsRepository.create(newProject)

    await sut.execute({
      projectId: newProject.id.toString(),
      description: 'Edited Project Description',
      repositoryUrl: 'https://www.github.com/username/project',
    })

    expect(projectsRepository.items[0]).toMatchObject({
      description: 'Edited Project Description',
      repositoryUrl: 'https://www.github.com/username/project',
    })
  })

  it('should not be able to edit an inexistent project', async () => {
    const result = await sut.execute({
      projectId: 'inexistent-project-id',
      description: 'Description',
      repositoryUrl: 'https://www.github.com/username/project',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit a project using invalid repository url', async () => {
    const newProject = makeProject({}, new UniqueEntityId('project-1'))

    await projectsRepository.create(newProject)

    const result = await sut.execute({
      projectId: newProject.id.toString(),
      description: 'Edited Project Description',
      repositoryUrl: 'invalid-url',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidHttpUrlError)
  })
})

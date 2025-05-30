import { CreateProjectUseCase } from '@/domain/use-cases/create-project'
import { InvalidHttpUrlError } from '@/domain/use-cases/errors/invalid-http-url-error'
import { InMemoryProjectsRepository } from 'test/repositories/in-memory-projects-repository'

let projectsRepository: InMemoryProjectsRepository
let sut: CreateProjectUseCase

describe('Create Project', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new CreateProjectUseCase(projectsRepository)
  })

  it('should be able to create a project', async () => {
    const result = await sut.execute({
      name: 'New Project',
      description: 'My First Test Project',
      repositoryUrl: 'https://www.github.com/username/project',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(projectsRepository.items[0]).toEqual(result.value?.project)
    }
  })

  it('should not be able to create a project with invalid repository url', async () => {
    const result = await sut.execute({
      name: 'New Project',
      description: 'My First Test Project',
      repositoryUrl: 'invalid-url',
    })

    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(InvalidHttpUrlError)
  })
})

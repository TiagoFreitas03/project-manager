import { CreateProjectUseCase } from '@/domain/use-cases/create-project'
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
    })

    expect(result.isRight()).toBe(true)
    expect(projectsRepository.items[0]).toEqual(result.value?.project)
  })
})

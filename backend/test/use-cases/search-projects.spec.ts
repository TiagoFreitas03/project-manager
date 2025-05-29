import { InMemoryProjectsRepository } from 'test/repositories/in-memory-projects-repository'
import { SearchProjectsUseCase } from '@/domain/use-cases/search-projects'
import { makeProject } from 'test/factories/make-project'

let projectsRepository: InMemoryProjectsRepository
let sut: SearchProjectsUseCase

describe('Search Projects', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new SearchProjectsUseCase(projectsRepository)
  })

  it('should be able to fetch all projects', async () => {
    await projectsRepository.create(makeProject({ name: 'Project 1' }))
    await projectsRepository.create(makeProject({ name: 'Project 2' }))
    await projectsRepository.create(makeProject({ name: 'Project 3' }))

    const result = await sut.execute({})

    expect(result.value?.projects).toEqual([
      expect.objectContaining({ name: 'Project 1' }),
      expect.objectContaining({ name: 'Project 2' }),
      expect.objectContaining({ name: 'Project 3' }),
    ])
  })

  it('should be able search projects filtering by name', async () => {
    await projectsRepository.create(makeProject({ name: 'Calendar' }))
    await projectsRepository.create(makeProject({ name: 'Calculator' }))

    const result = await sut.execute({ name: 'Calculator' })

    expect(result.value?.projects.length).toEqual(1)
    expect(result.value?.projects).toEqual([
      expect.objectContaining({ name: 'Calculator' }),
    ])
  })

  it('should be able search projects sorting by creation date (from newer to older)', async () => {
    await projectsRepository.create(makeProject({ name: 'Older Project' }))
    await projectsRepository.create(makeProject({ name: 'Newer Project' }))

    const result = await sut.execute({ orderBy: 'createdAt', order: 'desc' })

    expect(result.value?.projects).toEqual([
      expect.objectContaining({ name: 'Newer Project' }),
      expect.objectContaining({ name: 'Older Project' }),
    ])
  })

  it('should be able fetch projects from second page', async () => {
    for (let i = 1; i <= 22; i++) {
      const projectNumber = String(i).padStart(2, '0')

      await projectsRepository.create(
        makeProject({ name: `Project ${projectNumber}` }),
      )
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.projects).toEqual([
      expect.objectContaining({ name: 'Project 21' }),
      expect.objectContaining({ name: 'Project 22' }),
    ])
  })
})

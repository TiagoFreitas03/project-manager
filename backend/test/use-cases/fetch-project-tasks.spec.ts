import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchProjectTasksUseCase } from '@/domain/use-cases/fetch-project-tasks'
import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let sut: FetchProjectTasksUseCase

describe('Fetch Project Tasks', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new FetchProjectTasksUseCase(tasksRepository)
  })

  it('should be able to fetch project tasks', async () => {
    await tasksRepository.create(
      makeTask({ projectId: new UniqueEntityId('project-1') }),
    )
    await tasksRepository.create(
      makeTask({ projectId: new UniqueEntityId('project-1') }),
    )
    await tasksRepository.create(
      makeTask({ projectId: new UniqueEntityId('project-2') }),
    )

    const result = await sut.execute({ projectId: 'project-1' })

    expect(result.value?.tasks).toHaveLength(2)
  })
})

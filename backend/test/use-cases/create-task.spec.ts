import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { CreateTaskUseCase } from '@/domain/use-cases/create-task'
import { InvalidPriorityError } from '@/domain/use-cases/errors/invalid-priority-error'
import { makeProject } from 'test/factories/make-project'
import { InMemoryProjectsRepository } from 'test/repositories/in-memory-projects-repository'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let projectsRepository: InMemoryProjectsRepository
let sut: CreateTaskUseCase

describe('Create Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    projectsRepository = new InMemoryProjectsRepository()
    sut = new CreateTaskUseCase(tasksRepository, projectsRepository)
  })

  it('should be able to create a task', async () => {
    await projectsRepository.create(makeProject({}, new UniqueEntityId('p-1')))

    const result = await sut.execute({
      projectId: 'p-1',
      name: 'New Task',
      description: 'My First Test Task',
      priority: 1,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(tasksRepository.items[0]).toEqual(result.value?.task)
    }
  })

  it('should not be able to create a task for inexistent project', async () => {
    const result = await sut.execute({
      projectId: 'inexistent-project-id',
      name: 'New Task',
      description: 'My First Test Task',
      priority: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a task with invalid priority', async () => {
    await projectsRepository.create(makeProject({}, new UniqueEntityId('p-1')))

    const result = await sut.execute({
      projectId: 'p-1',
      name: 'New Task',
      description: 'My First Test Task',
      priority: 4, // invalid priority
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidPriorityError)
  })
})

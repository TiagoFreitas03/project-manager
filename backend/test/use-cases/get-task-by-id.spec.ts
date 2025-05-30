import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { GetTaskByIdUseCase } from '@/domain/use-cases/get-task-by-id'
import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let sut: GetTaskByIdUseCase

describe('Get Task By Id', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new GetTaskByIdUseCase(tasksRepository)
  })

  it('should be able to get a task by id', async () => {
    const newTask = makeTask({}, new UniqueEntityId('task-1'))
    await tasksRepository.create(newTask)

    const result = await sut.execute({ taskId: 'task-1' })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveProperty('task')
  })

  it('should not be able to get an inexistent task by id', async () => {
    const result = await sut.execute({ taskId: 'inexistent-task' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

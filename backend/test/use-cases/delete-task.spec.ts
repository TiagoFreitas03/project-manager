import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { DeleteTaskUseCase } from '@/domain/use-cases/delete-task'
import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let sut: DeleteTaskUseCase

describe('Delete Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(tasksRepository)
  })

  it('should be able to delete a task', async () => {
    const newTask = makeTask({}, new UniqueEntityId('task-1'))

    await tasksRepository.create(newTask)

    await sut.execute({ taskId: 'task-1' })

    expect(tasksRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an inexistent task', async () => {
    const result = await sut.execute({ taskId: 'inexistent-task' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

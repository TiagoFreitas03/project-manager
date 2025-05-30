import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { TaskStatus } from '@/domain/entities/value-objects/task-status'
import { InvalidTaskStatusError } from '@/domain/use-cases/errors/invalid-task-status-error'
import { UpdateTaskStatusUseCase } from '@/domain/use-cases/update-task-status'
import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let sut: UpdateTaskStatusUseCase

describe('Update Task Status', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new UpdateTaskStatusUseCase(tasksRepository)
  })

  it('should be able to update a task status', async () => {
    const newTask = makeTask(
      { status: TaskStatus.TO_DO },
      new UniqueEntityId('task-1'),
    )

    await tasksRepository.create(newTask)

    await sut.execute({
      taskId: newTask.id.toString(),
      status: 'DOING',
    })

    expect(tasksRepository.items[0]).toMatchObject({
      status: TaskStatus.DOING,
    })
  })

  it('should not be able to update the status of an inexistent task', async () => {
    const result = await sut.execute({
      taskId: 'inexistent-task-id',
      status: 'DOING',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to update task with invalid status', async () => {
    const newTask = makeTask({}, new UniqueEntityId('task-1'))

    await tasksRepository.create(newTask)

    const result = await sut.execute({
      taskId: newTask.id.toString(),
      status: 'INVALID-STATUS',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidTaskStatusError)
  })
})

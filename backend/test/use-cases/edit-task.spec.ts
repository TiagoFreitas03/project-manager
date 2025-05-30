import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { EditTaskUseCase } from '@/domain/use-cases/edit-task'
import { InvalidPriorityError } from '@/domain/use-cases/errors/invalid-priority-error'
import { makeTask } from 'test/factories/make-task'
import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let sut: EditTaskUseCase

describe('Edit Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new EditTaskUseCase(tasksRepository)
  })

  it('should be able to edit a task', async () => {
    const newTask = makeTask({}, new UniqueEntityId('task-1'))

    await tasksRepository.create(newTask)

    await sut.execute({
      taskId: newTask.id.toString(),
      name: 'Edited Task Name',
      description: 'Edited Task Description',
      priority: 3,
    })

    expect(tasksRepository.items[0]).toMatchObject({
      name: 'Edited Task Name',
      description: 'Edited Task Description',
      priority: 3,
    })
  })

  it('should not be able to edit an inexistent task', async () => {
    const result = await sut.execute({
      taskId: 'inexistent-task-id',
      name: 'Name',
      description: 'Description',
      priority: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit a task using invalid priority', async () => {
    const newTask = makeTask({}, new UniqueEntityId('task-1'))

    await tasksRepository.create(newTask)

    const result = await sut.execute({
      taskId: newTask.id.toString(),
      name: 'Edited task Name',
      description: 'Edited task Description',
      priority: 5,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidPriorityError)
  })
})

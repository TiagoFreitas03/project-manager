import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Task, TaskProps } from '@/domain/entities/task'
import { Status } from '@/domain/entities/value-objects/status'

export function makeTask(
  override: Partial<TaskProps> = {},
  id?: UniqueEntityId,
) {
  const task = Task.create(
    {
      name: faker.lorem.sentence(),
      description: faker.lorem.text(),
      priority: faker.number.int({ min: 1, max: 3 }),
      status: Status.TO_DO,
      projectId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return task
}

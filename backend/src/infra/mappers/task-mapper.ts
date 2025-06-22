import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Task } from '@/domain/entities/task'
import { Status } from '@/domain/entities/value-objects/status'
import { Prisma, Task as PrismaTask } from 'generated/prisma'

export class TaskMapper {
  static toDomain(raw: PrismaTask): Task {
    return Task.create(
      {
        name: raw.name,
        description: raw.description,
        status: Status[raw.status],
        priority: raw.priority,
        projectId: new UniqueEntityId(raw.projectId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(task: Task): Prisma.TaskUncheckedCreateInput {
    return {
      id: task.id.toString(),
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      projectId: task.projectId.toString(),
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }
}

import { Task } from '@/domain/entities/task'
import { TasksRepository } from '@/domain/repositories/tasks-repository'
import { TaskMapper } from '../mappers/task-mapper'
import { prisma } from '../lib/prisma'

export class PrismaTasksRepository implements TasksRepository {
  async create(task: Task) {
    const data = TaskMapper.toPrisma(task)

    await prisma.task.create({ data })
  }

  async findManyByProjectId(projectId: string) {
    const tasks = await prisma.task.findMany({
      where: { projectId },
    })

    return tasks.map(TaskMapper.toDomain)
  }

  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      return null
    }

    return TaskMapper.toDomain(task)
  }

  async save(task: Task) {
    const data = TaskMapper.toPrisma(task)

    await prisma.task.update({
      data,
      where: {
        id: data.id,
      },
    })
  }

  async delete(task: Task) {
    await prisma.task.delete({
      where: {
        id: task.id.toString(),
      },
    })
  }
}

import { Task } from '@/domain/entities/task'
import { TasksRepository } from '@/domain/repositories/tasks-repository'
import { TaskMapper } from '../mappers/task-mapper'
import { prisma } from '../lib/prisma'
import { Task as PrismaTask } from 'generated/prisma'

export class PrismaTasksRepository implements TasksRepository {
  async create(task: Task) {
    const data = TaskMapper.toPrisma(task)

    await Promise.all([
      prisma.task.create({ data }),
      this.updateProject(data.projectId),
    ])
  }

  async findManyByProjectId(projectId: string, archived: boolean) {
    const fifteenDaysAgo = new Date()
    fifteenDaysAgo.setDate(new Date().getDate() - 15)
    fifteenDaysAgo.setHours(0, 0, 0)

    let tasks: PrismaTask[] = []

    if (archived) {
      tasks = await prisma.task.findMany({
        where: {
          projectId,
          status: 'DONE',
          updatedAt: { lt: fifteenDaysAgo },
        },
        orderBy: { updatedAt: 'desc' },
      })
    } else {
      tasks = await prisma.task.findMany({
        where: {
          projectId,
          OR: [
            { status: { not: 'DONE' } },
            { updatedAt: { gte: fifteenDaysAgo } },
          ],
        },
        orderBy: [{ priority: 'asc' }, { updatedAt: 'asc' }],
      })
    }

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

    await Promise.all([
      prisma.task.update({
        data,
        where: { id: data.id },
      }),
      this.updateProject(data.projectId),
    ])
  }

  async delete(task: Task) {
    await Promise.all([
      prisma.task.delete({
        where: { id: task.id.toString() },
      }),
      this.updateProject(task.projectId.toString()),
    ])
  }

  async updateProject(projectId: string) {
    await prisma.project.update({
      data: { updatedAt: new Date() },
      where: { id: projectId },
    })
  }
}

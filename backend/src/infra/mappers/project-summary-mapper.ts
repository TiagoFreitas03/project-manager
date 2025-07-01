import { ProjectSummary } from '@/domain/entities/value-objects/project-summary'
import { Project as PrismaProject, Task as PrismaTask } from 'generated/prisma'

type PrismaProjectSummary = PrismaProject & {
  tasks: PrismaTask[]
}

export class ProjectSummaryMapper {
  static toDomain(raw: PrismaProjectSummary): ProjectSummary {
    const { tasks } = raw

    const tasksAmount = tasks.length
    const doneTasks = tasks.filter((t) => t.status === 'DONE').length
    const progress = tasksAmount === 0 ? 0 : (doneTasks * 100) / tasksAmount
    const status = progress === 0 ? 'TO_DO' : progress < 100 ? 'DOING' : 'DONE'

    return ProjectSummary.create({
      slug: raw.slug,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      progress,
      status,
    })
  }
}

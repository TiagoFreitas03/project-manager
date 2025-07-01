import { Project } from '@/domain/entities/project'
import {
  CountProjectsFilters,
  ProjectsRepository,
  SearchProjectsFilters,
} from '@/domain/repositories/projects-repository'
import { ProjectMapper } from '../mappers/project-mapper'
import { prisma } from '../lib/prisma'
import { ProjectSummaryMapper } from '../mappers/project-summary-mapper'

export class PrismaProjectsRepository implements ProjectsRepository {
  async create(project: Project) {
    const data = ProjectMapper.toPrisma(project)

    await prisma.project.create({ data })
  }

  async findById(id: string) {
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return null
    }

    return ProjectMapper.toDomain(project)
  }

  async save(project: Project) {
    const data = ProjectMapper.toPrisma(project)

    await prisma.project.update({
      data,
      where: {
        id: data.id,
      },
    })
  }

  async searchMany({ name = '', orderBy, order, page }: SearchProjectsFilters) {
    const projects = await prisma.project.findMany({
      where: {
        name: { contains: name },
      },
      include: {
        tasks: true,
      },
      orderBy: {
        [orderBy]: order,
      },
      skip: page * 20 - 20,
    })

    return projects.map(ProjectSummaryMapper.toDomain)
  }

  async findBySlug(slug: string) {
    const project = await prisma.project.findUnique({
      where: { slug },
    })

    if (!project) {
      return null
    }

    return ProjectMapper.toDomain(project)
  }

  async delete(project: Project) {
    await prisma.project.delete({
      where: {
        id: project.id.toString(),
      },
    })
  }

  async count({ name = '' }: CountProjectsFilters) {
    return prisma.project.count({
      where: {
        name: { contains: name },
      },
    })
  }
}

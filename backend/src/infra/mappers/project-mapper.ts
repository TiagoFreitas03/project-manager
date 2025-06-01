import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Project } from '@/domain/entities/project'
import { Slug } from '@/domain/entities/value-objects/slug'
import { Prisma, Project as PrismaProject } from 'generated/prisma'

export class ProjectMapper {
  static toDomain(raw: PrismaProject): Project {
    return Project.create(
      {
        name: raw.name,
        description: raw.description,
        repositoryUrl: raw.repositoryUrl,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(project: Project): Prisma.ProjectUncheckedCreateInput {
    return {
      id: project.id.toString(),
      name: project.name,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      slug: project.slug.value,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }
  }
}

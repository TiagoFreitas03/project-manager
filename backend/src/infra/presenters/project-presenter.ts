import { Project } from '@/domain/entities/project'

export class ProjectPresenter {
  static toHTTP(project: Project) {
    return {
      id: project.id.toString(),
      name: project.name,
      description: project.description,
      slug: project.slug.value,
      repositoryUrl: project.repositoryUrl,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }
  }
}

import { ProjectSummary } from '@/domain/entities/value-objects/project-summary'

export class ProjectSummaryPresenter {
  static toHTTP(project: ProjectSummary) {
    return {
      slug: project.slug.value,
      name: project.name,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      status: project.status,
      progress: project.progress,
    }
  }
}

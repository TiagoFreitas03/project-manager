import { Project } from '@/domain/entities/project'
import { ProjectsRepository } from '@/domain/repositories/projects-repository'

export class InMemoryProjectsRepository implements ProjectsRepository {
  public items: Project[] = []

  async create(project: Project) {
    this.items.push(project)
  }
}

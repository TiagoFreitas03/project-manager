import { Project } from '@/domain/entities/project'
import { ProjectsRepository } from '@/domain/repositories/projects-repository'

export class InMemoryProjectsRepository implements ProjectsRepository {
  public items: Project[] = []

  async create(project: Project) {
    this.items.push(project)
  }

  async findById(id: string) {
    const project = this.items.find((item) => item.id.toString() === id)

    if (!project) {
      return null
    }

    return project
  }

  async save(project: Project) {
    const itemIndex = this.items.findIndex((item) => item.id === project.id)

    this.items[itemIndex] = project
  }
}

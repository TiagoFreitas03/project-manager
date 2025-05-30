import { Project } from '@/domain/entities/project'
import {
  ProjectsRepository,
  SearchProjectsFilters,
} from '@/domain/repositories/projects-repository'

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

  async searchMany({ name, orderBy, order, page }: SearchProjectsFilters) {
    let filteredProjects = this.items

    if (name) {
      filteredProjects = filteredProjects.filter((project) =>
        project.name.includes(name),
      )
    }

    filteredProjects.sort((x, y) =>
      x[orderBy] > y[orderBy] ? 1 : y[orderBy] > x[orderBy] ? -1 : 0,
    )

    if (order === 'desc') {
      filteredProjects.reverse()
    }

    filteredProjects = filteredProjects.slice((page - 1) * 20, page * 20)

    return filteredProjects
  }

  async findBySlug(slug: string) {
    const project = this.items.find((item) => item.slug.value === slug)

    if (!project) {
      return null
    }

    return project
  }
}

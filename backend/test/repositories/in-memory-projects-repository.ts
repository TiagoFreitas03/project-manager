import { Project } from '@/domain/entities/project'
import { ProjectSummary } from '@/domain/entities/value-objects/project-summary'
import {
  CountProjectsFilters,
  ProjectsRepository,
  SearchProjectsFilters,
} from '@/domain/repositories/projects-repository'
import { InMemoryTasksRepository } from './in-memory-tasks-repository'

export class InMemoryProjectsRepository implements ProjectsRepository {
  public items: Project[] = []

  constructor(private tasksRepository: InMemoryTasksRepository) {}

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

    filteredProjects = filteredProjects.slice((page - 1) * 12, page * 12)

    const projectsSummary: ProjectSummary[] = []

    for (let i = 0; i < filteredProjects.length; i++) {
      const project = filteredProjects[i]
      const tasks = this.tasksRepository.items.filter(
        (task) => task.projectId.toString() === project.id.toString(),
      )
      const tasksAmount = tasks.length
      const doneTasks = tasks.filter((t) => t.status === 'DONE').length
      const progress = tasksAmount === 0 ? 0 : (doneTasks * 100) / tasksAmount
      const status =
        progress === 100 ? 'DONE' : progress === 0 ? 'TO_DO' : 'DOING'

      projectsSummary.push(
        ProjectSummary.create({
          slug: project.slug.value,
          name: project.name,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          progress,
          status,
        }),
      )
    }

    return projectsSummary
  }

  async findBySlug(slug: string) {
    const project = this.items.find((item) => item.slug.value === slug)

    if (!project) {
      return null
    }

    return project
  }

  async delete(project: Project) {
    const itemIndex = this.items.findIndex((item) => item.id === project.id)

    this.items.splice(itemIndex, 1)
  }

  async count({ name }: CountProjectsFilters) {
    let filteredProjects = this.items

    if (name) {
      filteredProjects = filteredProjects.filter((project) =>
        project.name.includes(name),
      )
    }

    return filteredProjects.length
  }
}

import { Project } from '../entities/project'

export interface ProjectsRepository {
  create(project: Project): Promise<void>
  findById(id: string): Promise<Project | null>
  save(project: Project): Promise<void>
}

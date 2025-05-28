import { Project } from '../entities/project'

export interface ProjectsRepository {
  create(project: Project): Promise<void>
}

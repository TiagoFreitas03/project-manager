import { PaginationParams } from '@/core/repositories/pagination-params'
import { Project } from '../entities/project'
import { Order } from '@/core/types/order'
import { ProjectSummary } from '../entities/value-objects/project-summary'

export type ProjectSortableProp = 'name' | 'createdAt' | 'updatedAt'

export interface CountProjectsFilters {
  name?: string
}

export interface SearchProjectsFilters
  extends PaginationParams,
    CountProjectsFilters {
  orderBy: ProjectSortableProp
  order: Order
}

export interface ProjectsRepository {
  create(project: Project): Promise<void>
  findById(id: string): Promise<Project | null>
  save(project: Project): Promise<void>
  searchMany(filters: SearchProjectsFilters): Promise<ProjectSummary[]>
  findBySlug(slug: string): Promise<Project | null>
  delete(project: Project): Promise<void>
  count(filters: CountProjectsFilters): Promise<number>
}

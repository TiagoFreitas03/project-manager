import { PaginationParams } from '@/core/repositories/pagination-params'
import { Project } from '../entities/project'
import { Order } from '@/core/types/order'

export type OrderProjectsBy = 'name' | 'createdAt' | 'updatedAt'

export interface SearchProjectsFilters extends PaginationParams {
  name?: string
  orderBy: OrderProjectsBy
  order: Order
}

export interface ProjectsRepository {
  create(project: Project): Promise<void>
  findById(id: string): Promise<Project | null>
  save(project: Project): Promise<void>
  searchMany(filters: SearchProjectsFilters): Promise<Project[]>
}

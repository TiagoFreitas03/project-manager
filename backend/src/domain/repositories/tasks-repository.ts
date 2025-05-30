import { Task } from '../entities/task'

export interface TasksRepository {
  create(task: Task): Promise<void>
  findManyByProjectId(projectId: string): Promise<Task[]>
  findById(id: string): Promise<Task | null>
}

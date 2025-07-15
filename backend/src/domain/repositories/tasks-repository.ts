import { Task } from '../entities/task'

export interface TasksRepository {
  create(task: Task): Promise<void>
  findManyByProjectId(projectId: string, archived: boolean): Promise<Task[]>
  findById(id: string): Promise<Task | null>
  save(task: Task): Promise<void>
  delete(task: Task): Promise<void>
}

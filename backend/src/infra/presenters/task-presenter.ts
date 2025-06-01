import { Task } from '@/domain/entities/task'

export class TaskPresenter {
  static toHTTP(task: Task) {
    return {
      id: task.id.toString(),
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }
}

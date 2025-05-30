import { Task } from '@/domain/entities/task'
import { TasksRepository } from '@/domain/repositories/tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async create(task: Task) {
    this.items.push(task)
  }

  async findManyByProjectId(projectId: string) {
    const filteredTasks = this.items.filter(
      (item) => item.projectId.toString() === projectId,
    )

    return filteredTasks
  }
}

import { Task } from '@/domain/entities/task'
import { TasksRepository } from '@/domain/repositories/tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async create(task: Task) {
    this.items.push(task)
  }

  async findManyByProjectId(projectId: string, archived: boolean) {
    const fifteenDaysAgo = new Date()
    fifteenDaysAgo.setDate(new Date().getDate() - 15)
    fifteenDaysAgo.setHours(0, 0, 0)

    let filteredTasks = this.items.filter(
      (task) => task.projectId.toString() === projectId,
    )

    if (archived) {
      filteredTasks = filteredTasks.filter((task) => {
        return task.status === 'DONE' && task.updatedAt < fifteenDaysAgo
      })
    } else {
      filteredTasks = filteredTasks.filter((task) => {
        return task.status !== 'DONE' || task.updatedAt >= fifteenDaysAgo
      })
    }

    return filteredTasks
  }

  async findById(id: string) {
    const task = this.items.find((item) => item.id.toString() === id)

    if (!task) {
      return null
    }

    return task
  }

  async save(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id)

    this.items[itemIndex] = task
  }

  async delete(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id)

    this.items.splice(itemIndex, 1)
  }
}

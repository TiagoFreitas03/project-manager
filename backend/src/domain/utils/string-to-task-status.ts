import { TaskStatus } from '../entities/value-objects/task-status'

export function stringToTaskStatus(value: string): TaskStatus | undefined {
  const key = Object.keys(TaskStatus).find((key) => key === value)

  if (!key) {
    return undefined
  }

  return TaskStatus[key as keyof typeof TaskStatus]
}

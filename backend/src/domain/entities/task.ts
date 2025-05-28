import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

enum TaskStatus {
  TO_DO = 'TO_DO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export interface TaskProps {
  projectId: UniqueEntityId
  name: string
  description: string
  status: TaskStatus
  priority: number
  createdAt: Date
  updatedAt?: Date
}

export class Task extends Entity<TaskProps> {
  get projectId() {
    return this.props.projectId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get status() {
    return this.props.status
  }

  get priority() {
    return this.props.priority
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<TaskProps, 'createdAt'>, id?: UniqueEntityId) {
    const task = new Task(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return task
  }
}

import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Status } from './value-objects/status'

export interface TaskProps {
  projectId: UniqueEntityId
  name: string
  description: string
  status: Status
  priority: number
  createdAt: Date
  updatedAt: Date
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

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  set priority(priority: number) {
    this.props.priority = priority
    this.touch()
  }

  set status(status: Status) {
    this.props.status = status
    this.touch()
  }

  static create(
    props: Optional<TaskProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const task = new Task(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )

    return task
  }
}

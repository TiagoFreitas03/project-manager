import { Entity } from '@/core/entities/entity'
import { Slug } from './value-objects/slug'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface ProjectProps {
  name: string
  description: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Project extends Entity<ProjectProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get slug() {
    return this.props.slug
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
    this.props.slug = Slug.createFromText(name)
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  static create(
    props: Optional<ProjectProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const project = new Project(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return project
  }
}

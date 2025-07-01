import { ValueObject } from '@/core/entities/value-object'

export interface ProjectSummaryProps {
  slug: string
  name: string
  createdAt: Date
  updatedAt: Date
  status: string
  progress: number
}

export class ProjectSummary extends ValueObject<ProjectSummaryProps> {
  get slug() {
    return this.props.slug
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get status() {
    return this.props.status
  }

  get progress() {
    return this.props.progress
  }

  static create(props: ProjectSummaryProps) {
    return new ProjectSummary(props)
  }
}

import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Project, ProjectProps } from '@/domain/entities/project'

export function makeProject(
  override: Partial<ProjectProps> = {},
  id?: UniqueEntityId,
) {
  const project = Project.create(
    {
      name: faker.lorem.sentence(),
      description: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return project
}

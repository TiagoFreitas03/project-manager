import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidPriorityError extends Error implements UseCaseError {
  constructor() {
    super('Invalid priority (must be between 1 and 3).')
  }
}

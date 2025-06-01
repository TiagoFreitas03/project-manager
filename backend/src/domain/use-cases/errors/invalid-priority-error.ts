import { BadRequestError } from '@/core/errors/bad-request-error'

export class InvalidPriorityError extends BadRequestError {
  constructor() {
    super()
    this.message = 'Invalid priority (must be between 1 and 3).'
  }
}

import { BadRequestError } from '@/core/errors/bad-request-error'

export class InvalidTaskStatusError extends BadRequestError {
  constructor(status: string) {
    super()
    this.message = `"${status}" is not a valid status`
  }
}

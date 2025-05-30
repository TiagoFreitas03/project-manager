import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidTaskStatusError extends Error implements UseCaseError {
  constructor(status: string) {
    super(`${status} is not a valid status`)
  }
}

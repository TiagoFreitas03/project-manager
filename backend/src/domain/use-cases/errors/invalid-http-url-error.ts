import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidHttpUrlError extends Error implements UseCaseError {
  constructor(url: string) {
    super(`${url} is not a valid HTTP URL`)
  }
}
